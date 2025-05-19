module.exports = function(eleventyConfig) {
  // Copy assets directory
  eleventyConfig.addPassthroughCopy({
    'src/assets': 'assets'
  });

  // Copy public directory
  eleventyConfig.addPassthroughCopy('public');

  // Watch for changes in these directories
  eleventyConfig.addWatchTarget('./src/assets/');
  eleventyConfig.addWatchTarget('./src/_includes/');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ['njk', 'md', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    pathPrefix: '/'
  };
};
