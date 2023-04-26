import webpHtmlNoSvg    from "gulp-webp-html-nosvg"
//import versionNumber    from "gulp-version-number"
import pug              from "gulp-pug"

export const pug_to_html = () => {
  return app.gulp.src(app.path.src.pug, { sourcemaps: app.isDev })
  
    // вывод сообщений об ошибках
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "PUG",
        message: "Error: <%= error.message %>"
      })
    ))

    // Обработка pug
    .pipe(pug({
      pretty: true, // Сжатие HTML
      verbose: true, // Показывать в терминале какой файл обработан
    }))

    // Замена путей к файлам
    .pipe(app.plugins.replace(/@img\//g, 'assets/images/'))
    .pipe(app.plugins.replace(/@css\//g, 'assets/'))
    .pipe(app.plugins.replace(/@js\//g, 'assets/'))

    // Замена картинок на Webp
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpHtmlNoSvg()
      ))

    // Убирается кэширование css и js
    // .pipe(
    //   app.plugins.if(
    //     app.isBuild,
    //     versionNumber({
    //       'value': '%DT%',
    //       'append': {
    //         'key': '_v',
    //         'cover': 0,
    //         'to': [
    //           'css',
    //           'js'
    //         ]
    //       },
    //       'output': {
    //         'file': 'gulp/version.json'
    //       }
    //     })
    //   )
    // )

    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.html))

    // Обновление сервера
    .pipe(app.plugins.browsersync.stream())
}