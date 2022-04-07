const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");

const bands = new Bands();
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Bon Jovi"));
bands.addBand(new Band("Héroes del silencio"));
bands.addBand(new Band("Metálica"));
bands.addBand(new Band("TOTO"));
//
//console.log(bands);

// Mensajes de Sockets
// on => es para escuchar el evento
// emit => es para emitir el evento

io.on("connection", (client) => {
  console.log("Cliente conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });

  client.on("mensaje", (payload) => {
    console.log("Mensaje!!!", payload.name);
    io.emit("mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    console.log("add-band  " + payload.name);
    const newBand = new Band(payload.name);
    console.log("newBand " + newBand);
    bands.addBand(newBand);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  // client.on("emitir-mensaje", (payload) => {
  //   //console.log(payload);
  //   //io.emit("nuevo-mensaje", payload); // esto emite a TODOS los clientes conectados
  //   client.broadcast.emit("nuevo-mensaje", payload); //  emite a TODOS menos al que lo  emitió
  // });
});
