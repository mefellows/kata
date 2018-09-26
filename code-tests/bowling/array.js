const sumArray = a => a.reduce((acc, v) => acc + v, 0);
const flatten = a => a.reduce((acc, v) => acc.concat(v), []);

module.exports = {
  sumArray,
  flatten
};
