const Nunjucks = require("nunjucks");
const path = require("path");
const config = require("./src/_data/config.json");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats(["njk", "md"]);

  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/files");

  const nunjucksEnvironment = new Nunjucks.Environment(
    new Nunjucks.FileSystemLoader([
      "src",
      path.join(
        path.dirname(require.resolve("nhsuk-frontend/package.json")),
        "packages/components"
      ),
    ])
  );

  nunjucksEnvironment.addFilter("isArray", (something) =>
    Array.isArray(something)
  );

  eleventyConfig.setLibrary("njk", nunjucksEnvironment);
  eleventyConfig.htmlTemplateEngine = "njk";
  eleventyConfig.markdownTemplateEngine = "njk";

  eleventyConfig.dir = {
    output: "dist",
    input: "src",
    layouts: "_layouts",
    includes: "_includes",
  };

  eleventyConfig.pathPrefix = config.pathPrefix;

  return eleventyConfig;
};
