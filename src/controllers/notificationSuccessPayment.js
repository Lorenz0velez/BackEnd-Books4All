const { transporter } = require("../mailer");
const { MAIL } = process.env;

const notificationSuccessPayment = async (user, eachBookDB, quantitys) => {
  const titles = [];
  const images = [];
  const prices = [];
  const total = [];

  for (let i = 0; i < eachBookDB.length; i++) {
    const book = eachBookDB[i];
    titles.push(book.dataValues.title);
    images.push(book.dataValues.image);
    prices.push(book.dataValues.price);
    quantitys;
  }

  await transporter.sendMail({
    from: `"Books4All ${MAIL}`,
    to: `${user}`,
    subject: `Your payment was successful!`,
    html: `<html>
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
          justify-content: center;
        }
        
        img {
          height: 50px;
        }
           
        h1 {
          font-size: 24px;
          margin: 0;
          color: white;
        }
        h3 {
            color: black;
        }    
      </style>
    </head>
    <body>
      <header>
        <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1098218919065559060/books4all.png" alt="Logo de Books4All">
        <h1>Your purchase:</h1>
      </header>
    <div>
    ${eachBookDB.map(
      (book, i) => `
      <div style="background-color: #f2f2f2; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
        <hr/>
        <div style="display: inline-block">
          <h3>${titles[i]}</h3> 
          <img src='${images[i]}' style="height: 100px; margin-right: 10px;"/>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: space-between;">
          <div>
           <h3> <b>Price:</b> USD${prices[i]}</h3>
 
            <h3><b>Quantity:</b> ${quantitys[i]}</h3>

            <h3><b>Subtotal:</b> USD${prices[i] * quantitys[i]} </h3>
          </div>
          <div>
            <b>Item:</b> ${total.push(prices[i] * quantitys[i])} 
          </div>
        </div>
      </div>
      `
    )}
      
      <hr/>
      <h2> <b>Total:</b> ${total.reduce(
        (a, b) => Number(a) + Number(b),
        0
      )}</h2>
    </div>  
    <footer className="bg-dark">
    <div className="container-fluid">
        <div className="row border-top justify-content-between p-3">
            <div className="col-sm p-0">
            </div>
            <div className="col-sm d-flex flex-row-reverse">
            <a href="https://books4-all-front.vercel.app/" className="text-light align-items-end">©Books4all</a>
            </div>
        </div>
    </div>
</footer>
    
    `,
  });
};

module.exports = { notificationSuccessPayment };
