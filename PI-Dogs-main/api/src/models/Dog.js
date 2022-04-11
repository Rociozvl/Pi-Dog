const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
        type: DataTypes.STRING,
        allowNull:false,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    weight:{
     type: DataTypes.INTEGER,
     allowNull:false,
    }
  });
};