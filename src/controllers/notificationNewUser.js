const { transporter } = require("../mailer");
const { MAIL } = process.env;

const notificationNewUser = async (email, user) => {
  await transporter.sendMail({
    from: `"Books4All"<${MAIL}>`, //.env
    to: `${email}`,
    subject: "Books4All: New User",
    html: `<p> The user ${user.dataValues.name} has been successfully created.<p/>`,
  });
};

module.exports = { notificationNewUser };
