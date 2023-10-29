let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("logged");
    resolve("after ");
  }, 2000);
});
p.then((res) => console.log("damn? ", res));
console.log(2 + +"2");
