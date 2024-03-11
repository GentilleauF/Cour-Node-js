const pokemons = require("../db/mock-pokemon");
const { Pokemon } = require("../db/sequelize");
const { Op } = require("sequelize");
const  auth = require('../auth/auth')

module.exports = (app) => {
  app.get("/api/pokemons", auth, (req, res) => {
    if (req.query.name) {
      // Cette méthode nous permet de req les parametres dans l'url grace a Express
      const name = req.query.name;
      const limit = parseInt(req.query.limit) || 5;

      if (name.length < 2) {
        const message = 'La recherche doit contenir au moins 2 caractéres';
        return res.status(400).json({message})
      }

      return Pokemon.findAndCountAll({
        where: {
          //Ici le tout permet de recherhcer si name eq (=) name
          // name: { // name ici est le nom de la propriété du modéle Pokemon
          //   [Op.eq] : name // 'name' est le critére de la recherche
          // },
          name: {
            [Op.like]: `%${name}%`,
          },
        },
        order: ['name'],
        limit: limit,
      }) //Permet de chercher les rsultat where la condition
        .then(({count, rows}) => {
          const message = `Il y a ${count} pokemons qui correpondent à la recher ${name}`;
          res.json({ message, data: rows });
        });
    } else {
      Pokemon.findAll({order: ['name']})
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste n'a pas pu être recuperee, veuillez ressayer`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
