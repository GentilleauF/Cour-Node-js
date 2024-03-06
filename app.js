const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('Coucou'));

app.get('/api/pokemon/:id', (req,res) =>{
    const id = req.params.id
     res.send(`Vous avez demandé le pokemon n°${id}`)
    })



app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));