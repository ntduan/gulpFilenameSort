var through = require('through');

function gulpFileNameSort(options) {

  var files = []
  var preFiles = []
  var folFiles = []

  if (!options) {
    options = {}
  }

  var pre = options.previous
  var fol = options.following

  function onFile(file) {
    if (pre && Object.prototype.toString.call(pre) === '[object Array]') {
      if (pre.indexOf(file.relative) > -1) {
        preFiles[pre.indexOf(file.relative)] = file
        return
      }
    }

    if (fol && Object.prototype.toString.call(fol) === '[object Array]') {
      if (fol.indexOf(file.relative) > -1) {
        folFiles[fol.indexOf(file.relative)] = file
        return
      }
    }
    files.push(file);
  }

  function onEnd() {
    require('natural-compare-lite');
    var _this = this;

    files.sort(function (a, b) {
      return String.naturalCompare(a.relative.toLowerCase(), b.relative.toLowerCase());
    });

    preFiles = preFiles.filter(function(v){return !!v})
    folFiles = folFiles.filter(function(v){return !!v})

    files = preFiles.concat(files).concat(folFiles)

    if (options.order === 'desc') {
      files.reverse();
    }

    files.forEach(function (file) {
      _this.emit('data', file);
    });

    return this.emit('end');
  }

  return through(onFile, onEnd);
}

module.exports = gulpFileNameSort;