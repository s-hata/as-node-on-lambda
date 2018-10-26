import { src, dest, series } from 'gulp';
import * as install from 'gulp-install';
import * as zip from 'gulp-zip';
import * as del from 'del';

export function clean() {
  return del(['./dist']);
}

export function source() {
  return src(['**/*', '!node_modules/**', '!dist/**', 'README.md'])
    .pipe(zip('source.zip'))
    .pipe(dest('dist/'));
}

function js() {
  return src('./src/*.js')
    .pipe(dest('./dist'));
}

function npm() {
  return src('./package.json')
    .pipe(dest('./dist'))
    .pipe(install({ production: true }));
}

function archive() {
  return src(['dist/**/*', '!dist/package.json', '!dist/package-lock.json', 'dist/.*'])
    .pipe(zip('lambda.zip'))
    .pipe(dest('dist'));
}

export const build = series(js, npm, archive)
export default series(clean, build);
