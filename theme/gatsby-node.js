const page = (node, index, basePath) => {
  if (!node) return
  const permalink = index === 0 ? "" : `${node.name}`

  return {
    title: index === 0 ? "" : index.toString(10),
    path: `/${basePath}/${permalink}`.replace(/\/\/+/g, "/"),
  }
}

exports.createPages = ({ graphql, actions }, options) => {
  const { createPage } = actions
  const { basePath = "/", infoLink } = options

  return new Promise((resolve, reject) => {
    graphql(`
      query allImageFilesQuery {
        allFile(
          filter: { sourceInstanceName: { eq: "images" } }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            next {
              name
            }
            node {
              name
            }
            previous {
              name
            }
          }
        }
      }
    `).then(results => {
      results.data.allFile.edges.forEach(({ next, node, previous }, index) => {
        const currentPage = page(node, index, basePath)
        const nextPage = page(next, index + 1, basePath)
        const previousPage = page(previous, index - 1, basePath)

        createPage({
          path: currentPage.path || basePath,
          component: require.resolve("./src/templates/imagePage.js"),
          context: {
            nextPage,
            previousPage,
            title: currentPage.title,
            imageFileName: node.name,
            infoLink,
          },
        })
      })
      resolve()
    })
  })
}
