"use strict";
const fs = require("fs");

fs.watch("target.txt", () => console.log("File changed!"));
console.log("watching for changes in target.txt");
