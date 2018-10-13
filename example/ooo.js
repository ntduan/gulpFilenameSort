const { Transform } = require('stream');

module.exports = () => {
  const files = [];

  return new Transform({
    objectMode: true,
    transform(file, encoding, callback) {
      files.push(file);
      callback();
    },
    flush(callback) {
      console.log(files);
      [4, 5, 6].forEach(this.push, this);
      callback();
    },
  });
};
