const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require('./src/db/sequelize')

const app = express();
const port = 3000;


app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

  sequelize.initDb();

  require('./src/routes/findAllPokemons')(app)
  require('./src/routes/findPokemonByPk')(app)
  require('./src/routes/createPokemon')(app)
  require('./src/routes/updatePokemon')(app)
  require('./src/routes/deletePokemon')(app)
  require('./src/routes/login')(app)

app.use(({res}) => {
    const message = "Impossible d'afficger la ressource demandée"
    res.status(404).json({message})
})

app.get("/", (req, res) => res.send("Coucou"));
app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));
