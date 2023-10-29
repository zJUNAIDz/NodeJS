function Calculator() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };
  this.calculate = function (str) {
    const split = str.split(" "),
      a = +split[0],
      op = split[1],
      b = +split[2];
    if (!this.methods[op] || isNaN(a) || isNaN(b)) return;
    return this.methods[op](a, b);
  };
  this.addMethod = function (op, fn) {
    this.methods[op] = fn;
  };
}

const calc = new Calculator();
console.log(calc.calculate("3 + 7"));
calc.addMethod("*", (a, b) => a * b);
console.log(calc.calculate("3 * 7"));
