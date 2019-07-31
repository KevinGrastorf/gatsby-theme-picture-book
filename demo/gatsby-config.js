/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    {
      resolve: `@olavea/gatsby-theme-picture-book`,
      options: {
        imagePath: `./book/pics/`,
        audioPath: `./book/audio/`,
        infoLink: {
          title: "GitHub",
          url: `https://github.com/olavea/gatsby-theme-picture-book`,
        },
      },
    },
  ],
}
