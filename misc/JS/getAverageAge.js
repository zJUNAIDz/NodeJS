let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr = [john, pete, mary];

const getAverageAge = (arr) =>
  arr.reduce((acc, curr) => (curr.age + acc), 0) / arr.length;

console.log(getAverageAge(arr));
