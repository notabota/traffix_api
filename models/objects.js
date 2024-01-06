const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('objects', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ts: {
      type: DataTypes.DATE(6),
      allowNull: true
    },
    speed: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'records',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'objects',
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
        name: "objects_record_idx",
        using: "BTREE",
        fields: [
          { name: "record_id" },
        ]
      },
    ]
  });
};
