// const arr = ["Ant", "whatever", "apple", "banana"];
// arr.splice(4, 0, "zamn", "wow");

// console.log(arr);

function camelize(str) {
  return str
    .split("-")
    .map((word, index) =>
      index == 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}
console.log(camelize("background-color"));

function filterRange(arr, a, b) {
  return arr.filter((elem) => elem >= a && elem <= b);
}
