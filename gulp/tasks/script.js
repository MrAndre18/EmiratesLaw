import webpack                from 'webpack-stream'               // Импорт файлов JS

export const script = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })

    .pipe(webpack({
      mode: app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js'
      }
    }))
  
    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.js))

    // Обновление сервера
    .pipe(app.plugins.browsersync.stream())
}