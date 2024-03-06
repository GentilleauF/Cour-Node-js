const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req,res) => res.send('Coucou'));

app.get('/api/pokemon/1', (req,res) => res.send("hello Bulbizarre ! "));

app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));