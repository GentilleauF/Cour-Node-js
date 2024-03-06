const express = require('express');
const {sucess} = require('./helper')
let pokemons = require('./mock-pokemon')

const app = express();
const port = 3000;

const logger =(req, res, next) => {
    console.log(`URL : ${req.url} `)
    next()
}

app.use(logger)

app.get('/', (req,res) => res.send('Coucou'));

app.get('/api/pokemon/:id', (req,res) =>{
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Pokemon trouvé'

     res.json(sucess(message, pokemon))
    });


//Avoir le nombre de pokémons
app.get('/api/pokemons', (req,res) =>{
    const message = 'Liste de tout les pokemons'

    res.json(sucess(message, pokemons))
});





app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));