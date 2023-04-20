const {User} = require('../DB_connection')
const {Role} = require('../DB_connection')

const authorizationMiddleware = async (req, res, next) => {
    const {user_name} = req.body; // asumiendo que el usuario se ha autenticado y se ha adjuntado a req.user
    const user = await User.findOne({
        where: {name: user_name}
    })


    try {

        if (!user) {
            return res.status(403).send("El usuario no está autorizado para realizar esta acción");
          }
          
      const role = await user.getRoles(); // obtenemos los roles asignados al usuario

      console.log(role[0])

      const isAuthorized = role.some(r => r.name === "user"); // comprobamos si el usuario tiene el rol "User"

       if (isAuthorized) {
        next(); // el usuario tiene permiso, así que pasamos al siguiente middleware
      } else {
        res.status(403).send("El usuario no está autorizado para realizar esta acción"); // el usuario no tiene permiso, devolvemos un error 403
      }
    } catch (error) {
      res.status(500).send("Error al comprobar la autorización del usuario"); // ocurrió un error al obtener los roles del usuario, devolvemos un error 500
    }
  };

  module.exports = authorizationMiddleware;