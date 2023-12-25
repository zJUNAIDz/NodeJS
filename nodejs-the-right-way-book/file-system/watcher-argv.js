"use strict";

const fs = require("fs");
const fileName = process.argv[2];
if (!fileName) throw new Error("File name required!");
fs.watch(fileName, () => console.log(`File  ${fileName} changed`));
console.log(`Watching for changes in ${fileName}...`);
