// const { comprobarJWT } = require('../helpers/jwt');
// const { iniciarReunion, finalizarReunion, obtenerMiembrosOnline, usuarioConectado, usuarioDesconectado } = require('../controllers/EquipoChat.controller');
// const { cargarNotificacionesXusuario, actualizarListaDeNotificaciones } = require('../controllers/notificaciones.controller');
// const { usuarioEnLinea, listaDeUsuariosEnElSocket } = require('../controllers/perfil.controller');

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const portA = "COM3";
        
const sPort = new SerialPort({
    path: portA,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false
});

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        
      
        const parser = sPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))
        
        this.io.on('connection',  (socket) => {
            console.log('Client connected');
        
            const onDataReceived = (data) => {
                console.log('data :>> ', data);
                socket.emit('signal', { payload: data });
            };
        
            // Supongamos que tienes un objeto llamado `parser` configurado
            parser.on('data', onDataReceived);
        
            socket.on('disconnect', () => {
                console.log('Client disconnected');
                // Deja de escuchar el evento 'data' cuando el cliente se desconecta
                parser.off('data', onDataReceived);
            });
        });

    }


}


module.exports = Sockets;