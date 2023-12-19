
// Paquete para leer y establecer las variables de entorno
require('dotenv').config();

// Server Model: Contiene todo el servidor de express + socket.io configurado
const Server = require('./models/Server');


// Inicializar la instancia del server
const server = new Server();

// Ejecutar el server
server.execute();


// const express = require('express');
// const http = require('http');
// const {Server} = require('socket.io');
// const cors = require('cors');
// const { SerialPort } = require('serialport');
// const { ReadlineParser } = require('@serialport/parser-readline');

// const app = express();

// app.use(cors());  // Habilitar CORS
// const server = http.createServer(app);

// const io = new Server(server, {
//   path: '/socket', // Puedes configurar la ruta del socket
//   cors: {
//     origin: 'http://localhost:4200', // Reemplaza con la URL de tu aplicación Angular
//     methods: ['GET', 'POST'],
//   },
// });


// const port = 3000;
// const portA = "COM3";

// const sPort = new SerialPort({
//     path: portA,
//     baudRate: 9600,
//     dataBits: 8,
//     parity: 'none',
//     stopBits: 1,
//     flowControl: false
// });

// const parser = sPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

// io.on('connection', (socket) => {
//     console.log('Client connected');

//     const onDataReceived = (data) => {
//         console.log('data :>> ', data);
//         io.emit('signal', { payload: data });
//     };

//     // Supongamos que tienes un objeto llamado `parser` configurado
//     parser.on('data', onDataReceived);

//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//         // Deja de escuchar el evento 'data' cuando el cliente se desconecta
//         parser.off('data', onDataReceived);
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
