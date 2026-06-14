// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "Home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-research",
          title: "Research",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-publications",
          title: "Publications",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "nav-notes",
          title: "Notes",
          description: "Mathematical and theoretical chemistry notes, written and maintained as living manuscripts.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/notes/";
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-news",
          title: "News",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "post-input-output-theory-for-planar-fabry-perot-cavities",
        
          title: "Input-Output Theory for Planar Fabry-Perot Cavities",
        
        description: "A derivation of the two-dimensional cavity photon field, coherent pumping, input-output relations, radiative losses, and the Lindblad master equation for planar Fabry-Perot cavities.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/input-output-theory-for-fabry-perot-cavities/";
          
        },
      },{id: "post-building-k-parallel-wavelet-pulses-in-maxwelllink",
        
          title: "Building k-Parallel Wavelet Pulses in MaxwellLink",
        
        description: "A technical note on how MaxwellLink&#39;s k_parallel_pulse builds real-space molecular drives and mode-space photonic drives in the multimode Fabry-Perot cavity solver.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/k-parallel-pulses-in-maxwelllink/";
          
        },
      },{id: "post-computing-large-matrices-product-with-generalized-inverse-fsf",
        
          title: "Computing Large Matrices Product with Generalized Inverse \(FSF^+\)",
        
        description: "A numerical linear algebra note on generalized inverses, SVD, scipy.linalg.solve, Cholesky decomposition, and LU decomposition for \(FSF^+\).",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/computing-fsf-inverse/";
          
        },
      },{id: "post-complex-shifted-gaussian-integral-and-the-heat-kernel",
        
          title: "Complex-Shifted Gaussian Integral and the Heat Kernel",
        
        description: "A contour proof that a complex-shifted Gaussian integral equals the ordinary one, with an application to the free-particle heat kernel.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/gaussian-integral-complex-shift/";
          
        },
      },{id: "post-a-residue-theorem-evaluation-of-int-0-1-frac-ln-x-x-2-x-1-mathrm-d-x",
        
          title: "A Residue-Theorem Evaluation of \(\int_0^1 \frac{\ln x}{x^2-x-1}\,\mathrm{d}x\)",
        
        description: "A residue theorem evaluation of a superhard real integral.",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/integal1/";
          
        },
      },{id: "books-baby-math-on-quantum-chemistry",
          title: 'Baby Math on Quantum Chemistry',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/baby_math_on_quantum_chemistry/";
            },},{id: "books-note-on-functional-analysis",
          title: 'Note on Functional Analysis',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/note_on_functional_analysis/";
            },},{id: "books-note-on-theoretical-chemistry",
          title: 'Note on Theoretical Chemistry',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/note_on_theoretical_chemistry/";
            },},{id: "news-first-day-in-my-personal-website",
          title: 'First day in my personal website!',
          description: "",
          section: "News",},{id: "news-new-10k-road-pb-44-38-today",
          title: 'New 10k road PB 44:38 today!',
          description: "",
          section: "News",},{id: "news-first-contribution-to-i-pi",
          title: 'First contribution to i-PI!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_3/";
            },},{id: "projects-ai-enhanced-research",
          title: 'AI-enhanced Research',
          description: "LLM-based autonomous agents for scientific simulations, workflow orchestration, and research code optimization. This project builds reliable agentic systems such as FermiLink that can plan computational tasks, connect domain tools, refine code iteratively, and organize reproducible multi-step experiments.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/aiagents/";
            },},{id: "projects-computational-polaritonics",
          title: 'Computational Polaritonics',
          description: "Atomistic and mesoscale cavity molecular dynamics for realistic vibrational polaritons. This project studies how optical cavities reshape molecular vibrations, relaxation, energy transfer, and nonlinear spectroscopic responses, while developing self-consistent light-matter simulation tools such as CavMD and MaxwellLink.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/polaritonics/";
            },},{id: "teachings-data-science-fundamentals",
          title: 'Data Science Fundamentals',
          description: "This course covers the foundational aspects of data science, including data collection, cleaning, analysis, and visualization. Students will learn practical skills for working with real-world datasets.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/data-science-fundamentals/";
            },},{id: "teachings-introduction-to-machine-learning",
          title: 'Introduction to Machine Learning',
          description: "This course provides an introduction to machine learning concepts, algorithms, and applications. Students will learn about supervised and unsupervised learning, model evaluation, and practical implementations.",
          section: "Teachings",handler: () => {
              window.location.href = "/teachings/introduction-to-machine-learning/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%73%74%6F%6C%66%6F@%75%64%65%6C.%65%64%75", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=8WzTBusAAAAJ&hl", "_blank");
        },
      },{
        id: 'social-github_profile',
        title: 'Github_profile',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/Astolfo-Official", "_blank");
        },
      },{
        id: 'social-research_group',
        title: 'Research_group',
        section: 'Socials',
        handler: () => {
          window.open("https://www.taoeli.org/", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
