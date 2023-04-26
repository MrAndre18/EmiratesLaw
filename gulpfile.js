// Основной модуль
import gulp from "gulp"

// Импорт путей
import { path } from "./gulp/config/path.js"
// Импорт общих файлов
import { plugins } from "./gulp/config/plugins.js"

// Передаём значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// импорт задач
import { pug_to_html }  from "./gulp/tasks/pug_to_html.js"
import { scss_to_css }  from "./gulp/tasks/scss_to_css.js"
import { script }       from "./gulp/tasks/script.js"
import { images }       from "./gulp/tasks/images.js"
import { otf2Ttf,
        ttf2Woff,
        fontsStyle }    from "./gulp/tasks/fonts.js"
import { reset }        from "./gulp/tasks/reset.js"
import { server }       from "./gulp/tasks/server.js"
import { zip }          from "./gulp/tasks/zip.js"

// Наблюдатель за изменениями в файлах
const watcher = () => {
  gulp.watch(path.watch.pug, pug_to_html)
  gulp.watch(path.watch.scss, scss_to_css)
  gulp.watch(path.watch.js, script)
  gulp.watch(path.watch.images, images)
}

const fonts = gulp.series(otf2Ttf, ttf2Woff, fontsStyle)

const mainTasks = gulp.series(
  fonts,
  gulp.parallel(pug_to_html,
                scss_to_css,
                script,
                images)
)

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server)),
      build = gulp.series(reset, mainTasks),
      deployZIP = gulp.series(reset, mainTasks, zip)

export { dev }
export { build }
export { deployZIP }

// Выполнение сценария по умолчанию
gulp.task('default', dev)