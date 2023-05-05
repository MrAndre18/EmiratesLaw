// Получаем имя папки проекта
import * as nodePath from 'path'
const rootFolder = nodePath.basename(nodePath.resolve())

const buildFolder = `./build`
const srcFolder = `./src`

export const path = {
  build: {
    html        : `${buildFolder}/`,
    css         : `${buildFolder}/assets/`,
    fonts       : `${buildFolder}/assets/fonts/`,
    images      : `${buildFolder}/assets/images/`,
    js          : `${buildFolder}/assets/`
  },
  src: {
    pug         : `${srcFolder}/views/pages/*.pug`,
    scss        : `${srcFolder}/assets/styles/*.scss`,
    images      : `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg         : `${srcFolder}/assets/images/**/*.svg`,
    js          : `${srcFolder}/*.js`
  },
  watch: {
    pug         : `${srcFolder}/views/**/*.pug`,
    scss        : `${srcFolder}/assets/styles/**/*.scss`,
    js          : `${srcFolder}/**/*.js`,
    images      : `${srcFolder}/assets/images/**/*.*`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder
}
