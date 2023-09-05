//--------------------------------------------------------------------------
//*As we are using event emmiter from logger.js, we no longer need this EventEmmiter object in this file
// import EventEmiter from "events";
// const EventEmiter = require("events");
// const emmiter = new EventEmiter();
const Logger = require("./logger");
const logger = new Logger();
//*register a listener
logger.on("logging", (arg) => {
  console.log(arg);
});
logger.log("meesage");
