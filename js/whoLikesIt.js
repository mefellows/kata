// You probably know the "like" system from Facebook and other pages. People can "like" blog posts, pictures or other items. We want to create the text that should be displayed next to such an item.
// Implement a function likes :: [String] -> String, which must take in input array, containing the names of people who like an item. It must return the display text as shown in the examples:
// likes [] // must be "no one likes this"
// likes ["Peter"] // must be "Peter likes this"
// likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
// likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
// likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"

// For 4 or more names, the number in and 2 others simply increases.

const likes2 = names => {
  const first = names.slice(0, 2).join(", ");

  switch (names.length) {
    case 0:
      return "no one likes this";
    case 1:
      return `${names[0]} likes this`;
    case 2:
      return `${names[0]} and ${names[1]} like this`;
    case 3:
      return `${first} and ${names.pop()} like this`;
    default:
      return `${first} and ${names.length - 2} others like this`;
  }
};

const likes = names => {
  return {
    0: "no one likes this",
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`
  }[Math.min(4, names.length)];
};
/*
// favourite community kata:
//
function likes(names) {
  return {
    0: 'no one likes this',
    1: `${names[0]} likes this`,
    2: `${names[0]} and ${names[1]} like this`,
    3: `${names[0]}, ${names[1]} and ${names[2]} like this`,
    4: `${names[0]}, ${names[1]} and ${names.length - 2} others like this`,
  }[Math.min(4, names.length)]
}
*/

console.log(likes([]));
console.log(likes([]) == "no one likes this");
console.log(likes(["Peter"]));
console.log(likes(["Peter"]) == "Peter likes this");
console.log(likes(["Jacob", "Alex"]));
console.log(likes(["Jacob", "Alex"]) == "Jacob and Alex like this");
console.log(likes(["Max", "John", "Mark"]));
console.log(likes(["Max", "John", "Mark"]) == "Max, John and Mark like this");
console.log(likes(["Alex", "Jacob", "Mark", "Max"]));
console.log(
  likes(["Alex", "Jacob", "Mark", "Max"]) ==
    "Alex, Jacob and 2 others like this"
);
console.log(likes(["Alex", "Jacob", "Mark", "Max", "Billy"]));
console.log(
  likes(["Alex", "Jacob", "Mark", "Max", "Billy"]) ==
    "Alex, Jacob and 3 others like this"
);
