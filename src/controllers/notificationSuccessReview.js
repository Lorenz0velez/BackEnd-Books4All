/* const { transporter } = require("../mailer");
const { MAIL } = process.env;

const notificationSuccessReview = async (user, newReview, book) => {
  await transporter.sendMail({
    from: `"Books4All"<${MAIL}>`, //.env
    to: `${user.email}`,
    subject: `Review successfully submitted: ${book.dataValues.title}! `,
    html: `<b> Rating: </b> ${newReview.rating}, <div>  <b>Review:</b> "${newReview.body}".</div>  `,
  });
};

module.exports = { notificationSuccessReview };
 */
const { transporter } = require("../mailer");
const { MAIL } = process.env;

const notificationSuccessReview = async (user, newReview, book) => {
  await transporter.sendMail({
    from: `"Books4All"<${MAIL}>`, //.env
    to: `${user.email}`,
    subject: `Review successfully submitted: ${book.dataValues.title}! `,
    html: `
    <html>
    <head>
      <style>
        /* Estilos del cuerpo del correo */
        body {
          background-color: rgb(33, 37, 41);
          color: white;
          font-family: Arial, sans-serif;
        }
        
        /* Estilos del encabezado */
        header {
          background-color: black;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        img {
          height: 50px;
        }
        
        h1 {
          font-size: 24px;
          margin: 0;
        }
      </style>
    </head>
    <body>
      <header>
        <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1098218919065559060/books4all.png" alt="Logo de Books4All">
        <h1>Tu reseña ha sido publicada!</h1>
      </header>
      <h3><b>Calificación:</b> ${newReview.rating}</h3>
      <h3><b>Reseña:</b> "${newReview.body}"</h3>
      <br><br>
      <footer className="bg-dark">
        <div className="container-fluid">
            <div className="row border-top justify-content-between p-3">
                <div className="col-sm p-0">
                <Link to="/about" className="text-light text-decoration-none">About us</Link>
                </div>
                <div className="col-sm d-flex flex-row-reverse">
                <a href="https://books4-all-front.vercel.app/" className="text-light align-items-end">©Books4all</a>
                </div>
            </div>
        </div>
    </footer>
    </body>
  </html>
    `,
  });
};

module.exports = { notificationSuccessReview };
