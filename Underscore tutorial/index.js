const _ = require("underscore");
//? How does require() method resolves node module?
//* require method consider its parameter as :
//* 1. Core Module (of nodeJS) if not then
//* 2. File or Folder or else
//* 3. node_module

//*checks if array contains given element and return boolean
console.log(_.contains([1, 2, 3, 4], 3));
