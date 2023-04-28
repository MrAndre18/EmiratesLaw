import webpack                from 'webpack-stream'               // Импорт файлов JS

export const script = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })

    // вывод сообщений об ошибках
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "JS",
        message: "Еблуша, тут ошибочка: <%= error.message %>"
      })
    ))

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