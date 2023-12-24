function unique(arr) {
  let result = [];
  for (let word of arr) {
    if (!result.includes(word)) {
      result.push(word);
    }
  }
  return result;
}

let strings = [
  "Hello",
  "World",
  "Hello",
  "World",
  "World",
  "World",
  "Hello",
  "Hello",
  ":-O",
];
let setify = new Set(strings);
console.log(unique(strings)); // Hello, World, :-O
console.log(Array.from(setify));
