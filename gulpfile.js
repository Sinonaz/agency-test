import path from 'node:path'
import { fileURLToPath } from 'node:url'
import gulp from 'gulp'
import webp from 'gulp-webp'
import rename from 'gulp-rename'
import cheerio from 'gulp-cheerio'
import svgstore from 'gulp-svgstore'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/*
Generating webp images
 */
export function generateWebp() {
  return gulp
    .src(path.join(__dirname, 'src/public/img/**/*.{jpg,jpeg,png,gif}'), {
      encoding: false,
    })
    .pipe(webp())
    .pipe(gulp.dest(path.join(__dirname, 'src/public/img')))
}

/*
Generating sprite
 */
export function generateSprite() {
  return gulp
    .src(path.join(__dirname, 'src/public/img/svg/*.svg'))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(
      cheerio({
        run: ($) => {
          $('symbol').attr('fill', 'none')
        },
        parserOptions: { xmlMode: true },
      }),
    )
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest(path.join(__dirname, 'src/public/img')))
}
