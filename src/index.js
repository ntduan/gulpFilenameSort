const { Transform } = require('stream');
const { basename } = require('path');

module.exports = option => {
  let compare;
  if (typeof option === 'function') {
    compare = option;
  } else if (Array.isArray(option)) {
    compare = (pathA, pathB) => {
      const pre = option;
      const [baseA, baseB] = [basename(pathA), basename(pathB)]
      if (pre.includes(baseA) && !pre.includes(baseB)) {
        return baseA;
      } else if (!pre.includes(baseA) && pre.includes(baseB)) {
        return baseB;
      } else {
        return baseA.localeCompare(baseB);
      }
    };
  } else {
    compare = (pathA, pathB) => {
      return basename(pathA).localeCompare(basename(pathB));
    };
  }

  const compareFile = (fileA, fileB) => {
    return compare(fileA.path, fileB.path);
  };

  // 插入排序
  const rank = arr => {
    for (let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let j;
      for (j = i; j > 0 && compareFile(arr[j - 1], temp) > 0; j--) {
        arr[j] = arr[j - 1];
      }
      arr[j] = temp;
    }
    return arr;
  };

  const files = [];

  return new Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      files.push(file);
      callback();
    },
    flush(callback) {
      const rankedFiles = rank(files);
      for (const file of rankedFiles) {
        this.push(file);
      }
      callback();
    },
  });
};
