module.exports = {
  content: ["_site/**/*.html", "_site/**/*.js"],
  css: ["_site/assets/css/*.css"],
  output: "_site/assets/css/",
  skippedContentGlobs: ["_site/assets/**/*.html"],
  // Pie-chart topics are assigned at runtime via element.dataset.topic.
  // Preserve their attribute selectors and the color variables they define.
  dynamicAttributes: ["data-topic"],
};
