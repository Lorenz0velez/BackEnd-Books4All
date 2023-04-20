const jwt = require('jsonwebtoken'); 

const payload = {       // usuario que intenta hace login
  user_id: 20,
  username: 'nicolas',
  role: 'user'
};

const secretKey = 'my-secret-key';  // llave secreta que estara en .env, validara que sea autorizada por nosotros

const options = {   // opciones para el token
  expiresIn: '1m'   // el token expirara en 1 minuto
};
//                      datos-user, llave verifiacion, opcion
const newToken = jwt.sign(payload, secretKey, options);  // generacion del token

// token que recibio
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyMCwidXNlcm5hbWUiOiJuaWNvbGFzIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODE5OTMwODUsImV4cCI6MTY4MTk5MzE0NX0.TOi5-JlqGmV1JY8BRfeUxkqdyjj8bxpQMpQhS8XK8Fs'

// verifica que sea valido el token
const result = jwt.verify(token, secretKey)

//console.log(token);
console.log(result); // retorna el payload enviado en el sign