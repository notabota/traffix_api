const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cameras', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    counting_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    url: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    camera_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    url_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cameras',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
