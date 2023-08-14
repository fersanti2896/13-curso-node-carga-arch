const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const usuario = require('./usuario');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
        }

        /* Conexión a la base de datos */
        this.connectionDB();
        /* Middlewares */
        this.middlewares();
        /* Rutas de mi aplicación */
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {
        /* CORS */
        this.app.use( cors() );
        /* Lectura y Parseo del Body */
        this.app.use( express.json() );
        /* Directorio Público */
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.buscar, require('../routes/search') );
        this.app.use( this.paths.categorias, require('../routes/categorias') );
        this.app.use( this.paths.productos, require('../routes/productos') );
        this.app.use( this.paths.usuarios, require('../routes/user') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`REST Server corriendo en el puerto: ${ this.port }`);
        });
    }
}

module.exports = Server;