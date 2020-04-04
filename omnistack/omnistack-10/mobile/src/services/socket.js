import socketio from "socket.io-client";

const socket = socketio("http://192.168.15.10:3333", {
  autoConnect: false,
});

function subscribeToNewDevs(subscribeFunction) {
  socket.on("new-dev", subscribeFunction);
}

function connect(data) {
  socket.io.opts.query = data;
  socket.connect();
}

function disconnect() {
  if (socket.connected) socket.disconnect();
}

export { connect, disconnect, subscribeToNewDevs };
