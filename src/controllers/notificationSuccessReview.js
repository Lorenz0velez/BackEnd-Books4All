const { transporter } = require("../mailer");

const notificationSuccessReview = async (user, newReview, book) => {
  await transporter.sendMail({
    from: '"Books4All"<booksforall.notification@gmail.com>', //.env
    to: `${user.email}`,
    subject: `Review successfully submitted: ${book.dataValues.title}! `,
    html: `<b> Rating: ${newReview.rating}, <div>  Review: "${newReview.body}.</div>"  </b>`,
  });
};

module.exports = { notificationSuccessReview };
