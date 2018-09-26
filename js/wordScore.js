// Given a string of words, you need to find the highest scoring word.
// Each letter of a word scores points according to it's position in the alphabet: a = 1, b = 2, c = 3 etc.
// You need to return the highest scoring word as a string.
// If two words score the same, return the word that appears earliest in the original string.
// All letters will be lowercase and all inputs will be valid.
const high = sentence => {
  const lv = l => l.charCodeAt() - "a".charCodeAt() + 1;
  const wv = w => w.split("").reduce((acc, v) => acc + lv(v), 0);

  return sentence
    .split(" ")
    .sort((a, b) => wv(b) - wv(a))
    .shift();
};

console.log(high(""));
console.log(high("man i need a ixat taxi up to ubud"));
console.log(high("what time are we climbing up the volcano"));
console.log(high("take me to semynak"));
