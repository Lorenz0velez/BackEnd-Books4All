const { transporter } = require("../mailer");
const { USER } = process.env;

const notificationNewUser = async (email, user) => {
  await transporter.sendMail({
    from: `"Books4All Welcome!"<${USER}>`, //.env
    to: `${email}`,
    subject: "Books4All: New User",
    html: `<p> The user ${user} has been successfully created.<p/>`,
  });
};

module.exports = { notificationNewUser };
