const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('records', {
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
    begin_ts: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    end_ts: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    camera_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cameras',
        key: 'id'
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'records',
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
      {
        name: "camera",
        using: "BTREE",
        fields: [
          { name: "camera_id" },
        ]
      },
    ]
  });
};
