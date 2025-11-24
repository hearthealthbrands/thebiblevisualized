module.exports = function(eleventyConfig) {
  // 1. Pass through CSS and Images directly to the final site
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  // 2. ADD THIS: The missing "dateString" filter
  eleventyConfig.addFilter("dateString", (dateObj) => {
    // This turns the raw date into "November 25, 2025"
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // 3. Output Settings
  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};