
// import EventEmiter from "events";
const EventEmiter = require("events");
//* we no longer need this instance as we are extending it in Logger class
// const emmiter = new EventEmiter();
class Logger extends EventEmiter {
  log(arg) {
    //*example: Send an http request
    console.log(arg);
    this.emit("logging", { str: "hello worlds", int: 12 });
  }
}

//* Raise an Event
module.exports = Logger;
