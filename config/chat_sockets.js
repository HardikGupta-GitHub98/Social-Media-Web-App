module.exports.chatSockets = function (socketServer) {
	let io = require("socket.io")(socketServer);

	io.sockets.on("connection", function (socket) {
		console.log("new Connection Received", socket.id);

		socket.on("disconnect", function () {
			console.log("Connection Disconnected");
		});
		socket.on("join_room", function (data) {
			console.log("joining request received", data);
			socket.join(data.chatroom);
			io.in(data.chatroom).emit("user_joined", data);
		});
	});
};
