const { Error } = require("sequelize");

const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée' ]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg : 'Ce nom est déja pris'
        },
        validate: {
          notEmpty: {msg : "Veuillez entrer un nom"},
          notNull : {msg : "Veuillez renseigner un nom"}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg : "Veuillez utiliser des nombres entiers"},
          notNull : {msg : "Veuillez renseigner des point de vie"},
          min: {
            args: [0],
            msg : 'les pdv doivent avoir un minimum de 0'
          },
          max: {
            args: [999],
            msg : 'les pdv doivent avoir un maximum de 999'
          }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {msg : "Veuillez utiliser des nombres entiers"},
          notNull : {msg : "Veuillez renseigner des point de vie"},
          min: {
            args: [0],
            msg : 'les degats doivent avoir un minimum de 0'
          },
          max: {
            args: [99],
            msg : 'les degats doivent avoir un maximum de 99'
          }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {msg : "Veuillez renseigner une URL valide"},
          notNull : {msg : "Veuillez renseigner une URL"}
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(',');
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if(!value){
              throw new Error('Un pokemon doit avoir au moins 1 type')
            }
            if(value.split(',').lenght > 3) {
              throw new Error('Un pokemon peux avoir 3 types max')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error (`Le type de ce pokemon n'existe pas, veuillez entrer : ${validTypes}`)
              }
            });
          }
        }
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
