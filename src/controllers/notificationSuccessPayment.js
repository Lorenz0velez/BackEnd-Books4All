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
    from: `"Books4All: Purchase successful"<${MAIL}>`,
    to: `${user}`,
    subject: `Books4All: Your payment was successful!`,
    html: `<div>
    <h2>your purchase:</h2>
    ${eachBookDB.map(
      (book, i) => `
      <div >
      <hr/>
      <div style="display: inline-block">
      <h3>${titles[i]}</h3> 
      <img src='${images[i]}'/> 
      </div>
      <b>Price:</b> USD${prices[i]}
     <b>Quantity:</b>  ${quantitys[i]}
     <b>Subtotal:</b> USD${prices[i] * quantitys[i]} 
     </div>
     <b>Item</b> ${total.push(prices[i] * quantitys[i])} 
      <div>
      `
    )}
      
      <hr/>
      <h2> <b>Total:</b> ${total.reduce(
        (a, b) => Number(a) + Number(b),
        0
      )}</h2>
    </div>  `,
  });
};

module.exports = { notificationSuccessPayment };
