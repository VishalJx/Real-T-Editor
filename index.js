const express = require('express');
const { Server } = require('socket.io');
const ACTIONS = require('./backend/sockets/actions');
const compression = require('compression');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 5000;

//Below is the code for the custom server 
app.prepare().then(() => {
  const server = express();

  server.use(compression());

  server.use(function (req, res, next) {
    req.url = req.originalUrl.replace('/nextjs_custom_server/_next', '/_next');
    next();
  });

  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.all('*', (req, res) => {
    handle(req, res);
  });

  const httpServer = server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server listening on http://localhost:${port}`);
  });

  // Socket.IO integration
  const io = new Server(httpServer);
  const userSocketMap = {};

  const getAllConnectedClients = (roomId) => {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    });
  };

  io.on('connection', (socket) => {
    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
      userSocketMap[socket.id] = username;
      socket.join(roomId);
      const clientsList = getAllConnectedClients(roomId);

      clientsList.forEach(({ socketId }) => {
        io.to(socketId).emit(ACTIONS.JOINED, {
          clientsList,
          username,
          socketId: socket.id,
        });
      });
    });

    socket.on(ACTIONS.CODE_CHANGED, ({ roomId, code }) => {
      socket.in(roomId).emit(ACTIONS.CODE_CHANGED, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
      io.to(socketId).emit(ACTIONS.CODE_CHANGED, { code });
    });

    socket.on('disconnecting', () => {
      const rooms = [...socket.rooms];
      rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });
      });
      delete userSocketMap[socket.id];
      socket.leave();
    });
  });
});
