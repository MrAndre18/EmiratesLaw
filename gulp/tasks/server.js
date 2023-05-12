export const server = ( done ) => {
  app.plugins.browsersync.init({
    server: {
      baseDir: `${app.path.build.html}`,
      serveStaticOptions: {
        extensions: ["html"]
      }
    },
    notify: false,
    port: 3000,
  })
}