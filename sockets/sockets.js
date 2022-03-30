const {io} = require('../index');

// Mensajes de Sockets
// on => es para escuchar el evento
// emit => es para emitir el evento
io.on('connection', client => {
    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(payload) => {
        console.log('Mensaje!!!', payload.name);
        io.emit('mensaje',{admin:'Nuevo mensaje'});
    });

});
