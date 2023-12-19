// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');


const morgan = require('morgan');
const pkg = require('../../package.json');
const Sockets = require('../models/Sockets');

const { dbConnection } = require('../database/configdb');
const { configDB } = require('../config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.APP_PORT || 3000;
        // this.host = process.env.APP_HOST || localhost;
        // Conectar a DB


        // Http server
        this.server = http.createServer(this.app);

        // Configuraciones de sockets
        this.io = socketio(this.server, {  /* configuraciones */
            path: '/socket', 
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            }
        });

    }

    async initialize() {

        //    const main = async (pConfigDB) =>{
        try {
            //Conexión a la base de datos
            await dbConnection(configDB);

        } catch (error) {
            console.log(error);
        }
        //     }

        //     await main(configDB)
    }


    middlewares() {

        // Desplegar el directorio público
        this.app.use('/static', express.static(path.join(__dirname, '../temp')));

        // CORS
        this.app.use(cors());


        // Parseo del body
        this.app.use(express.json()); //Entiende los datos en formato JSON
        this.app.use(express.urlencoded({ extended: true })); //Lectura y parseo del req.body
        this.app.use(morgan('dev'));

        this.app.get('/', (req, res) => {
            res.status(200).json({
                name: app.get('pkg').name,
                author: app.get('pkg').author,
                description: app.get('pkg').description,
                version: app.get('pkg').version,
            })
        })

        // API End Points
        // this.app.use('/api/auth', require('../routes/auth'));

        this.app.use('/api/glucosa', require('../routes/pruebaGlucosa'));



    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets(this.io);
    }

    execute() {

        //Inicializar base de datos
        this.initialize();

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        // this.server.listen(this.port, this.host);
        this.server.listen(this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }

}


module.exports = Server;