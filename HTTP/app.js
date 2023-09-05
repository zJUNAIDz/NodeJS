//* getting http module
const { Socket } = require("dgram");
const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("at default page");
    res.end();
  }
  if (req.url == "/user/junaid") {
    res.write("the user Name is Junaid Shaikh hahahha");
    res.end();
  }
});
//* this is very low level demonstration of server event
//* we don't handle stuff like this irl
//* instead we pass a callback function directly to http.createServer();
// server.on("connection", (Socket) => {
//   console.log("New Connection...");
// });
server.listen(3000);
console.log("Listening to port 3000");
