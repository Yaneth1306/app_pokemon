const express = require('express');
const path = require('path');
const axios = require('axios');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        //midleWhere   es el principal que corre el modelo, el app corre lo primero que este en models con midkeWhere
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(express.static(path.join(__dirname, '..', 'public'))); // para poder trabajar con los archivos estáticos desde la carpeta 'public'
    }

    routes() {


        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '..', 'public', 'index.html')); //para que pueda conectar al index
        });

        // Ruta para buscar Pokémon
        this.app.get('/pokemon/:name', async (req, res) => {
            try {
                const { name } = req.params;
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                res.json(response.data);
            } catch (error) {
                console.error('Error al buscar Pokémon:', error);
                res.status(500).json({ error: 'Error al buscar Pokémon' });
            }
        });

        // Ruta para buscar bayas
        this.app.get('/baya/:name', async (req, res) => {
            try {
                const { name } = req.params;
                const response = await axios.get(`https://pokeapi.co/api/v2/berry/${name}`);
        res.json(response.data);
            } catch (error) {
                console.error('Error al buscar bayas:', error);
                res.status(500).json({ error: 'Error al buscar bayas' });
            }
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo por el puerto ${this.port}`);
        });
    }
}


module.exports = Server;