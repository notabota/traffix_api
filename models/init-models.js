var DataTypes = require("sequelize").DataTypes;
var _cameras = require("./cameras");
var _objects = require("./objects");
var _permissions = require("./permissions");
var _records = require("./records");
var _role_permissions = require("./role_permissions");
var _roles = require("./roles");
var _users = require("./users");

function initModels(sequelize) {
  var cameras = _cameras(sequelize, DataTypes);
  var objects = _objects(sequelize, DataTypes);
  var permissions = _permissions(sequelize, DataTypes);
  var records = _records(sequelize, DataTypes);
  var role_permissions = _role_permissions(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  permissions.belongsToMany(roles, { as: 'role_id_roles', through: role_permissions, foreignKey: "permission_id", otherKey: "role_id" });
  roles.belongsToMany(permissions, { as: 'permission_id_permissions', through: role_permissions, foreignKey: "role_id", otherKey: "permission_id" });
  records.belongsTo(cameras, { as: "camera", foreignKey: "camera_id"});
  cameras.hasMany(records, { as: "records", foreignKey: "camera_id"});
  role_permissions.belongsTo(permissions, { as: "permission", foreignKey: "permission_id"});
  permissions.hasMany(role_permissions, { as: "role_permissions", foreignKey: "permission_id"});
  objects.belongsTo(records, { as: "record", foreignKey: "record_id"});
  records.hasMany(objects, { as: "objects", foreignKey: "record_id"});
  role_permissions.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(role_permissions, { as: "role_permissions", foreignKey: "role_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});

  return {
    cameras,
    objects,
    permissions,
    records,
    role_permissions,
    roles,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
