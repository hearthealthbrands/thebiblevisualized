module.exports = function(eleventyConfig) {
  // 1. COPY COMMANDS (Crucial!)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images"); // <--- This line MUST be here
  eleventyConfig.addPassthroughCopy("src/js");

  // 2. Date Filter
  eleventyConfig.addFilter("dateString", (dateObj) => {
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