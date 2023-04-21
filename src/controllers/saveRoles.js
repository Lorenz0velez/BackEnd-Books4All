const { Role } = require('../DB_connection')

const createRoles = () => {
    Role.findOrCreate({
        where: { name: 'user' },
        defaults: { name: 'user' }
      });

      Role.findOrCreate({
        where: { name: 'admin' },
        defaults: { name: 'admin' }
      });
}

module.exports = {
    createRoles
}