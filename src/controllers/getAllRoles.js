const { Role } = require("../DB_connection");

const getAllRoles = async () => {

  return await Role.findAll();
};


module.exports = getAllRoles;
