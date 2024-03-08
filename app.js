const express = require("express");
const morgan = require("morgan");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize, DataTypes } = require("sequelize");
const { sucess, getUniqueId } = require("./helper");
let pokemons = require("./mock-pokemon");
const PokemonModel = require("./src/models/pokemon");

const app = express();
const port = 3000;

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

sequelize
  .authenticate()
  .then((_) => console.log("La connexion est OKK"))
  .catch((e) => console.error(`Erreur : ${e}`));

const Pokemon = PokemonModel(sequelize, DataTypes);

// Cette méthode permet de synchroniser le Model sur la BDD
sequelize.sync({ force: true }).then((_) => {
  console.log("la Table a été synchronisé");

  pokemons.map((pokemon) => {
    Pokemon.create({
      name: pokemon.name,
      hp: pokemon.hp,
      cp: pokemon.cp,
      picture: pokemon.picture,
      types: pokemon.types.join(),
    }).then((bulbizarre) => console.log(bulbizarre.toJSON()));
  });
});

// 1er Midllware utilisé pour afficher la route (ne pas oublier de le use)
// const logger =(req, res, next) => {
//     console.log(`URL : ${req.url} `)
//     next()
// }

app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

app.get("/", (req, res) => res.send("Coucou"));

app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message = "Pokemon trouvé";

  res.json(sucess(message, pokemon));
});

//Avoir le nombre de pokémons
app.get("/api/pokemons", (req, res) => {
  const message = "Liste de tout les pokemons";

  res.json(sucess(message, pokemons));
});

app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokemon ${pokemonCreated.name} à bien été ajouté`;
  res.json(sucess(message, pokemonCreated));
});

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });
  const message = `Le pokemon ${pokemonUpdated.name} a été modifié`;
  res.json(sucess(message, pokemonUpdated));
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(sucess(message, pokemonDeleted));
});

app.listen(port, () => console.log(`Nous sommes sur le port ${port}`));
