const {
  admin,
  guest, 
  customer
} = require(".");

//trae roles del .env

const ROLES = {
  Admin: admin,
  Guest: guest,
  Customer: customer,
};

module.exports = ROLES;