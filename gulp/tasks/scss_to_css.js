import dartSass               from 'sass'
import gulpSass               from 'gulp-sass'
import rename                 from 'gulp-rename'                  // Переименование файлов
import GulpCleanCss           from 'gulp-clean-css'               // Сжатие CSS
import webpCss                from 'gulp-webpcss'                 // Вывод WEBP изображений
import autoPrefixer           from 'gulp-autoprefixer'            // Добавление вендорных префиксов
import groupCssMediaQueries   from 'gulp-group-css-media-queries' // Группировка медиа запросов

const sass = gulpSass(dartSass)

export const scss_to_css = () => {
  return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })

    // вывод сообщений об ошибках
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "SCSS",
        message: "Еблуша, тут ошибочка: <%= error.message %>"
      })
    ))

    // Преобразование в CSS
    .pipe(sass({
      outputStyle: 'expanded'
    }))

    // Группировка медиа запросов
    .pipe(
      app.plugins.if(
        app.isBuild,
        groupCssMediaQueries()
      ))

    // Вывод WEBP
    .pipe(
      app.plugins.if(
        app.isBuild,
        webpCss({
          webpClass: '.webp',
          noWebpClass: '.no-webp'
        })
      ))

    // Добавление вендорных префиксов
    .pipe(
      app.plugins.if(
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true
        })
      ))

    // Замена путей к файлам
    .pipe(app.plugins.replace(/@img\//g, 'images/'))

    /* ####### Раскомментировать, если нужен не сжатый дубль CSS ####### */
    //.pipe(app.gulp.dest(app.path.build.css))

    // Сжатие CSS
    .pipe(
      app.plugins.if(
        app.isBuild,
        GulpCleanCss()
      ))

    // Переименование файла
    .pipe(rename({
      extname: '.min.css'
    }))
    
    // Загрузка файлов в build
    .pipe(app.gulp.dest(app.path.build.css))

    // Обновление сервера
    .pipe(app.plugins.browsersync.stream())
}