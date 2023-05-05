import webp       from 'gulp-webp'
import imagemin   from 'gulp-imagemin'

export const images = () => {
  return app.gulp.src(app.path.src.images)

    // вывод сообщений об ошибках
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "Еблуша, тут ошибочка",
        message: "IMAGES: <%= error.message %>"
      })
    ))

    // проверка обновления
    .pipe(app.plugins.newer(app.path.build.images))

    // Создание WEBP
    .pipe(webp())

    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.images))

    // Повторно получаем доступ к исходникам и проверяем на обновления
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))

    // Сжатие картинок
    .pipe(
      app.plugins.if(
        app.isBuild,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 3 // 0 or 7
        })
      ))

    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.images))

    // Получаем доступ к SVG
    .pipe(app.gulp.src(app.path.src.svg))

    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.images))

    // Обновление сервера
    .pipe(app.plugins.browsersync.stream())
}