const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const five = require("johnny-five");
const board = new five.Board();

board.on("ready", function() {
  this.pinMode(13, five.Pin.OUTPUT);
  const self = this;
  io.on("connection", socket => {
	  socket.on("fire", () => {
	    self.digitalWrite(13, 1);
		  self.wait(500, () => {
		    self.digitalWrite(13, 0);
		  });
	  });
	});
});

app.get('/', (req, res) => {
	res.sendfile(__dirname + "/public/index.html");
});

const port = process.env.PORT || 3000;
http.listen(port, () => { console.log("Server listening on : ", port) })
