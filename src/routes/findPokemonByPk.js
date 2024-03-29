const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
            const message = "Le pokemon n'existe pas";
            return res.status(404).json({message})
        }

        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = 'Erreur de récuperation, veuillez ressayer'
        res.status(500).json({message, data:error})
      })
  })
}