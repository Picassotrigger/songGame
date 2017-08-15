module.exports = function(sequelize, DataTypes) {
  var Songs = sequelize.define("songs", {
    song: {
      type: DataTypes.STRING,
      allowNull: false
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clip: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  
  return Songs;
};
