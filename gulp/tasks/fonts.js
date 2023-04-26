import fs         from 'fs'
import fonter     from 'gulp-fonter'
import ttf2woff2  from 'gulp-ttf2woff2'

export const otf2Ttf = () => {
  // Ищем файлы .otf
  return app.gulp.src(`${ app.path.srcFolder }/assets/fonts/*.otf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))

    // Конвертируем в .ttf
    .pipe(fonter({
      formats: ['ttf']
    }))

    // Выгружаем в исходную папку
    .pipe(app.gulp.dest(`${ app.path.srcFolder }/assets/fonts/`))
}

export const ttf2Woff = () => {
  // Ищем файлы .ttf
  return app.gulp.src(`${ app.path.srcFolder }/assets/fonts/*.ttf`, {})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'FONTS',
        message: 'Error: <%= error.message %>'
      })
    ))

    // Конвертируем в .woff
    .pipe(fonter({
      formats: ['woff']
    }))

    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts))

    // Ищем файлы .ttf
    .pipe(app.gulp.src(`${ app.path.srcFolder }/assets/fonts/*.ttf`))

    // Конвертация в .woff2
    .pipe(ttf2woff2())

    // Выгружаем в папку с результатом
    .pipe(app.gulp.dest(app.path.build.fonts))
}

export const fontsStyle = () => {
  // Файл стилей подключения шрифтов
  let fontsFile = `${ app.path.srcFolder }/assets/styles/themes/_fonts.scss`

  // Проверяем существуют ли файлы шрифтов
  fs.readdir(app.path.build.fonts, (err, fontsFiles) => {
    if (fontsFiles) {
      // проверяем существует ли файл стилей для подключения шрифтов
      if (!fs.existsSync(fontsFile)) {
        // Если файла нет - создаём его
        fs.writeFile(fontsFile, '', cb)
        let newFileOnly

        for (let i = 0; i < fontsFiles.length; i++) {
          // Записываем подключения шрифтов в файл стилей
          let fontFileName = fontsFiles[i].split('.')[0]

          if (newFileOnly !== fontFileName) {
            let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName,
                fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900
            } else {
              fontWeight = 400
            }

            // fs.appendFile(fontsFile,
            //   `@font-face {
            //     font-family: ${ fontName };
            //     font-display: swap;
            //     src: url("fonts/${ fontFileName }.woff2") format("woff2"), url("fonts/${ fontFileName }.woff") format("woff2");
            //     font-weight: ${ fontWeight };
            //     font-style: normal;
            //   }\r\n`, cb)

              fs.appendFile(fontsFile,
                `@font-face {\n\tfont-family: ${ fontName };\n\tfont-display: swap;\n\tsrc: url("fonts/${ fontFileName }.woff2") format("woff2"), url("fonts/${ fontFileName }.woff") format("woff");\n\tfont-weight: ${ fontWeight };\n\tfont-style: normal;\n}\r\n`, cb)
            
            newFileOnly = fontFileName
          }
        }
      } else {
        // Если файл есть - выводим сообщение
        console.warn(`Файл ${ app.path.srcFolder }/assets/styles/themes/_fonts.scss уже существует.\nДля обновления файла нужно его удалить!`);
      }
    }
  })

  return app.gulp.src(`${ app.path.srcFolder }`)
  function cb() { }
}