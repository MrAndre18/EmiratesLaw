import { deleteAsync }      from "del"
import GulpZip              from "gulp-zip"

export const zip = () => {
  deleteAsync(`./${ app.path.rootFolder }.zip`)

  return app.gulp.src(`${ app.path.buildFolder }/**/*.*`, {})
    // вывод сообщений об ошибках
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: "Еблуша, тут ошибочка",
        message: "ZIP: <%= error.message %>"
      })
    ))

    // Преобразование в ZIP
    .pipe(GulpZip(`${ app.path.rootFolder }.zip`))

    // Загрузка файлов в корень проекта
    .pipe(app.gulp.dest('./'))
}