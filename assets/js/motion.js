(() => {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setupReveals = () => {
    if (!("IntersectionObserver" in window) || !Element.prototype.animate) return;

    // Explicit targets avoid blog filtering, Masonry positioning, and hero text.
    // Publication rows animate inside the list items whose opacity is used by filters.
    const targets = document.querySelectorAll(
      [
        ".home-feed-grid > .home-feed-card",
        ".research-page > .page-hero",
        ".research-stream > .research-entry",
        ".publications-page > .page-hero",
        ".publications-page .publications ol.bibliography > li > .row",
        ".cv-overview-grid > article",
        ".cv--research-profile .cv-section-card > h3",
        ".cv--research-profile .cv-section-card .list-group > .list-group-item",
        ".cv--research-profile .cv-bibliography > ol.bibliography > li",
        ".cv--research-profile .cv-section-card > div > .card-text:not(ul)",
        ".blog-index > .blog-index-hero",
      ].join(",")
    );
    const pending = new Set();
    const animations = new Map();
    const canTranslate = window.CSS?.supports("translate", "0 16px");

    const finish = (target) => {
      target.classList.remove("motion-pending");
      pending.delete(target);
      observer.unobserve(target);
      animations.get(target)?.cancel();
      animations.delete(target);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting || !pending.has(target)) return;
          observer.unobserve(target);
          pending.delete(target);
          if (reducedMotion.matches) {
            finish(target);
            return;
          }

          // Individual translate composes with the existing hover transform.
          // No forwards fill: filters and hover retain control after the entrance.
          const isCV = Boolean(target.closest(".cv--research-profile"));
          const animation = target.animate(
            [
              { opacity: 0, ...(canTranslate ? { translate: isCV ? "0 24px" : "0 16px" } : {}) },
              { opacity: 1, ...(canTranslate ? { translate: "0 0" } : {}) },
            ],
            {
              duration: isCV ? 680 : 520,
              delay: Math.min(order++, 3) * (isCV ? 90 : 70),
              easing: "cubic-bezier(0.2, 0.65, 0.3, 1)",
              fill: "backwards",
            }
          );
          animations.set(target, animation);
          target.classList.remove("motion-pending");
          animation.onfinish = () => animations.delete(target);
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" }
    );

    if (!reducedMotion.matches) {
      targets.forEach((target) => {
        // Do not hide content already scrolled past or reached via an anchor.
        if (target.getBoundingClientRect().bottom <= 0 || target.matches(":target") || target.querySelector(":target")) return;
        pending.add(target);
        observer.observe(target);
        target.classList.add("motion-pending");
      });
    }

    reducedMotion.addEventListener("change", () => {
      if (!reducedMotion.matches) return;
      [...pending, ...animations.keys()].forEach(finish);
    });
    document.addEventListener("focusin", (event) => {
      // Keyboard focus should never land in invisible or moving content.
      // Pointer focus must not shift a link between pointerdown and click.
      if (!(event.target instanceof Element) || !event.target.matches(":focus-visible")) return;
      [...pending, ...animations.keys()].forEach((target) => {
        if (target.contains(event.target)) finish(target);
      });
    });
    window.addEventListener("pagehide", () => [...pending, ...animations.keys()].forEach(finish));
  };

  const setupField = () => {
    const field = document.querySelector(".home-field");
    const canvas = field?.querySelector("canvas");
    const context = canvas?.getContext("2d");
    if (!context) return;

    const hero = field.closest(".home-hero");
    // Keep the Hamiltonian pair together while both groups ride existing field lines.
    const equations = [...field.querySelectorAll(".home-field__equation-row, .home-field__equation--schrodinger")];
    const equationStates = equations.map((element, index) => ({
      element,
      index,
      phase: index * 1.4,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      renderX: null,
      renderY: null,
      previousY: 0,
      angle: 0,
      halfWidth: 0,
      halfHeight: 0,
    }));
    const colors = ["252, 126, 175", "169, 219, 235", "242, 178, 210", "173, 196, 229"];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, strength: 0, targetStrength: 0 };
    const pointerGain = 0.8;
    let width = 0;
    let height = 0;
    let compact = false;
    let visible = false;
    let pageActive = true;
    let frameId = null;
    let lastFrame = 0;
    let elapsed = 0;
    let equationOrder = 0;

    const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));

    const measureEquations = () => {
      equationStates.forEach((state) => {
        state.width = state.element.offsetWidth;
        state.height = state.element.offsetHeight;
        state.x = state.element.offsetLeft + state.width / 2;
        state.y = state.element.offsetTop + state.height / 2;
      });
    };

    const resetEquations = () => {
      equationOrder = 0;
      equationStates.forEach((state) => {
        state.renderX = null;
        state.renderY = null;
        state.element.style.removeProperty("transform");
        state.element.style.removeProperty("opacity");
      });
    };

    const waveY = (position, time, index) => {
      const phase = index * 1.15;
      const influence = pointer.strength * pointerGain;
      const fieldPosition = position - (pointer.x - 0.5) * influence * 0.28;
      const baseline =
        height * (0.36 + index * 0.1) +
        Math.sin(fieldPosition * Math.PI * (2.4 + index * 0.12) - time * 0.32 + phase) * height * (0.15 + index * 0.015) +
        Math.sin(fieldPosition * Math.PI * 5.2 + time * 0.22 + phase) * height * 0.025;
      const proximity = Math.exp(-Math.pow((position - pointer.x) / 0.34, 2));
      const sway = (pointer.y - 0.5) * height * influence * 0.26;
      // A broad pull deforms the original curves, without adding cursor trails.
      return baseline + sway + (pointer.y * height - baseline) * proximity * influence * 0.62;
    };

    const keepEquationInBounds = (state) => {
      const sine = Math.abs(Math.sin(state.angle));
      const cosine = Math.abs(Math.cos(state.angle));
      state.halfWidth = (state.width * cosine + state.height * sine) / 2;
      state.halfHeight = (state.height * cosine + state.width * sine) / 2;
      state.marginX = Math.min(width / 2, state.halfWidth + 12);
      state.marginY = Math.min(height / 2, state.halfHeight + 12);
      state.renderX = clamp(state.renderX, state.marginX, width - state.marginX);
      state.renderY = clamp(state.renderY, state.marginY, height - state.marginY);
    };

    const separateEquations = (distance) => {
      const upper = equationOrder > 0 ? equationStates[0] : equationStates[1];
      const lower = equationOrder > 0 ? equationStates[1] : equationStates[0];
      const roomAbove = Math.max(0, upper.renderY - upper.marginY);
      const roomBelow = Math.max(0, height - lower.marginY - lower.renderY);
      let moveUp = Math.min(distance / 2, roomAbove);
      const moveDown = Math.min(distance - moveUp, roomBelow);
      moveUp += Math.min(distance - moveUp - moveDown, roomAbove - moveUp);
      upper.renderY -= moveUp;
      lower.renderY += moveDown;
    };

    const avoidEquationOverlap = (seconds) => {
      const [first, second] = equationStates;
      if (!first || !second) return;

      const gap = compact ? 12 : 18;
      const buffer = compact ? 24 : 32;
      const horizontalDistance = Math.abs(second.renderX - first.renderX);
      const contactWidth = first.halfWidth + second.halfWidth + gap;
      if (horizontalDistance >= contactWidth + buffer) {
        equationOrder = 0;
        return;
      }

      // Keep their vertical order while their collision boxes cross horizontally.
      // This also prevents a fast cursor sweep from pushing one through the other.
      if (!equationOrder) equationOrder = Math.sign(second.previousY - first.previousY) || 1;
      const contactHeight = first.halfHeight + second.halfHeight + gap;
      const verticalDistance = () => (second.renderY - first.renderY) * equationOrder;
      const proximity = clamp((contactWidth + buffer - horizontalDistance) / buffer, 0, 1);
      const softPush = Math.max(0, contactHeight + buffer - verticalDistance()) * proximity * (1 - Math.exp(-seconds * 4));
      separateEquations(softPush);

      if (horizontalDistance < contactWidth) {
        // Resolve any remaining penetration after smoothing, including at edges.
        separateEquations(Math.max(0, contactHeight - verticalDistance()));
      }
    };

    const drawEquations = (time, seconds) => {
      if (reducedMotion.matches) {
        resetEquations();
        return;
      }

      const smoothing = 1 - Math.exp(-seconds * 7);
      equationStates.forEach((state) => {
        const lane = state.index === 0 ? 0 : compact ? 1 : 3;
        const drift = Math.sin(time * 0.13 + state.phase) * width * (compact ? 0.055 : 0.11);
        const pull = (pointer.x - 0.5) * width * pointer.strength * pointerGain * 0.36;
        const marginX = Math.min(width / 2, state.width / 2 + 18);
        const marginY = Math.min(height / 2, state.height / 2 + 20);
        const x = clamp(state.x + drift + pull, marginX, width - marginX);
        const position = x / width;
        const y = clamp(waveY(position, time, lane), marginY, height - marginY);
        const rise = waveY(position + 0.01, time, lane) - waveY(position - 0.01, time, lane);
        const angle = clamp(Math.atan2(rise, width * 0.02) * 0.16, -0.08, 0.08);

        state.previousY = state.renderY ?? y;
        if (state.renderX === null) {
          state.renderX = x;
          state.renderY = y;
          state.angle = angle;
        } else {
          state.renderX += (x - state.renderX) * smoothing;
          state.renderY += (y - state.renderY) * smoothing;
          state.angle += (angle - state.angle) * smoothing;
        }
        keepEquationInBounds(state);
      });

      avoidEquationOverlap(seconds);
      equationStates.forEach((state) => {
        state.element.style.transform = `translate3d(${(state.renderX - state.x).toFixed(2)}px, ${(state.renderY - state.y).toFixed(2)}px, 0) rotate(${state.angle.toFixed(4)}rad)`;
        state.element.style.opacity = (0.58 + Math.sin(time * 0.28 + state.phase) * 0.08).toFixed(3);
      });
    };

    const draw = (time, seconds = 0) => {
      context.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const waveCount = compact ? 2 : 4;
      for (let index = 0; index < waveCount; index++) {
        const color = colors[index];
        const gradient = context.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(${color}, 0)`);
        gradient.addColorStop(0.4, `rgba(${color}, 0.19)`);
        gradient.addColorStop(0.7, `rgba(${color}, 0.88)`);
        gradient.addColorStop(1, `rgba(${color}, 0.46)`);
        context.beginPath();
        for (let x = 0; x <= width + 6; x += 6) {
          const y = waveY(x / width, time, index);
          if (x === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.strokeStyle = gradient;
        context.lineWidth = 7;
        context.globalAlpha = 0.16;
        context.stroke();
        context.lineWidth = index % 2 ? 1 : 1.5;
        context.globalAlpha = 0.95;
        context.stroke();
        context.globalAlpha = 1;

        // A small light packet travels along each field line.
        const position = (time * (0.025 + index * 0.003) + index * 0.24) % 1;
        const x = position * width;
        const y = waveY(position, time, index);
        const glow = context.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, `rgba(${color}, 0.65)`);
        glow.addColorStop(0.2, `rgba(${color}, 0.22)`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        context.fillStyle = glow;
        context.beginPath();
        context.arc(x, y, 12, 0, Math.PI * 2);
        context.fill();
      }
      // Sample the same waves in the same frame so formulas follow their motion.
      drawEquations(time, seconds);
    };

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      compact = width < 600;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, compact ? 1.25 : 1.75);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      measureEquations();
      draw(elapsed);
    };

    const tick = (timestamp) => {
      if (!lastFrame) lastFrame = timestamp;
      const delta = timestamp - lastFrame;
      if (delta >= 1000 / 30) {
        const seconds = Math.min(delta / 1000, 0.1);
        const smoothing = 1 - Math.exp(-seconds * 9);
        pointer.x += (pointer.targetX - pointer.x) * smoothing;
        pointer.y += (pointer.targetY - pointer.y) * smoothing;
        pointer.strength += (pointer.targetStrength - pointer.strength) * smoothing;
        elapsed += seconds;
        lastFrame = timestamp;
        draw(elapsed, seconds);
      }
      frameId = window.requestAnimationFrame(tick);
    };

    const updatePlayback = () => {
      const running = visible && pageActive && !document.hidden && !reducedMotion.matches;
      field.dataset.fieldState = reducedMotion.matches ? "reduced" : running ? "running" : "paused";
      if (running) {
        if (frameId === null) {
          lastFrame = 0;
          frameId = window.requestAnimationFrame(tick);
        }
      } else {
        if (frameId !== null) window.cancelAnimationFrame(frameId);
        frameId = null;
        pointer.targetStrength = 0;
        pointer.strength = 0;
        field.dataset.fieldPointer = "idle";
        if (reducedMotion.matches) {
          elapsed = 0;
          draw(0);
        }
      }
    };

    const followPointer = (event) => {
      if (!finePointer.matches || reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = hero.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      pointer.targetX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      pointer.targetY = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      pointer.targetStrength = 1;
      field.dataset.fieldPointer = "active";
    };
    const releasePointer = () => {
      pointer.targetStrength = 0;
      field.dataset.fieldPointer = "idle";
    };
    hero.addEventListener("pointerenter", followPointer, { passive: true });
    hero.addEventListener("pointermove", followPointer, { passive: true });
    hero.addEventListener("pointerleave", releasePointer, { passive: true });
    finePointer.addEventListener("change", releasePointer);

    resize();
    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver((entries) => {
        if (entries.some(({ target }) => target === field)) resize();
        else {
          measureEquations();
          draw(elapsed);
        }
      });
      resizeObserver.observe(field);
      equations.forEach((equation) => resizeObserver.observe(equation));
    } else {
      window.addEventListener("resize", resize, { passive: true });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          updatePlayback();
        },
        { threshold: 0 }
      ).observe(hero);
    } else {
      visible = true;
    }

    reducedMotion.addEventListener("change", updatePlayback);
    document.addEventListener("visibilitychange", updatePlayback);
    window.addEventListener("pagehide", () => {
      pageActive = false;
      updatePlayback();
    });
    window.addEventListener("pageshow", () => {
      pageActive = true;
      updatePlayback();
    });
    updatePlayback();
  };

  setupReveals();
  setupField();
})();
