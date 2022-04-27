const { io } = require("../index");
const { comprobarJWT } = require("../helpers/jwt");
const {
  userConnected,
  userDesconnected,
  saveMessage,
} = require("../controllers/socket");

// Mensajes de Sockets
io.on("connection", (client) => {
  console.log("Cliente conectado");

  const [valido, uid] = comprobarJWT(client.handshake.headers["x-token"]);

  // verificar autenticación
  if (!valido) {
    return client.disconnect();
  }

  // cliente autenticado
  userConnected(uid);

  // ingresar al usuario a una sala en particular
  //  sala global donde estan todas las personas conectadas
  //  sala global, client.id, userId
  client.join(uid);

  // escuchar del cliente el mensaje-personal
  client.on("mensaje-personal", async (payload) => {
    await saveMessage(payload);
    io.to(payload.para).emit("mensaje-personal", payload);
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
    userDesconnected(uid);
  });
});
