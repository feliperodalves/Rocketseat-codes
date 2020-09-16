const socketio = require('socket.io');
const parseStringAsArray = require('./utils/ParseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebsocket = (server) => {
  io = socketio(server);

  io.on('connection', (socket) => {
    const { lat, lng, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinates: { lat: Number(lat), lng: Number(lng) },
      techs: parseStringAsArray(techs),
    });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter((conn) => {
    return (
      calculateDistance(coordinates, conn.coordinates) < 10 &&
      conn.techs.some((item) => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach((conn) => {
    io.to(conn.id).emit(message, data);
  });
};
