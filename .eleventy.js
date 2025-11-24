module.exports = function(eleventyConfig) {
  // 1. Pass through CSS and Images directly to the final site
  // This means if you put a file in src/images, it moves to _site/images automatically
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // 2. Output Settings
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};