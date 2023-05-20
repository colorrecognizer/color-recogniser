const { series } = require('gulp');

function runOneOffScripts(cb) {
  // body omitted
  cb();
}

function bundle(cb) {
  // body omitted
  cb();
}

exports.deployDB = series(runOneOffScripts, bundle);