const {
  admin,
  guest, 
  user
} = require(".");

//trae roles del .env

const ROLES = {
  Admin: admin,
  Guest: guest,
  User: user,
};

module.exports = ROLES;