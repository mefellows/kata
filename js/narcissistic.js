const narcissistic = value => {
  return (
    `${value}`
      .split("")
      .map((v, _, a) => Math.pow(v, a.length))
      .reduce((acc, v) => acc + v, 0) == value
  );
};

console.log(narcissistic(7));
console.log(narcissistic(371));
console.log(narcissistic(3711));
