const { transporter } = require("../mailer");
const { USER } = process.env;
/* 
const notificationNewUser = async (email, user) => {
  await transporter.sendMail({
    from: `"Books4All Welcome!"<${USER}>`, //.env
    to: `${email}`,
    subject: "Books4All: New User",
    html: `<p> The user ${user} has been successfully created.<p/>`,
  });
};

module.exports = { notificationNewUser };

const { transporter } = require("../mailer");
const { USER } = process.env;
 */
const notificationNewUser = async (email, user) => {
  await transporter.sendMail({
    from: `"Books4All Welcome!"<${USER}>`, //.env
    to: `${email}`,
    subject: "Books4All: New User",
    html: `
    <html>
    <head>
      <style>
        body {
          background-color: rgb(33, 37, 41);
          color: white;
          font-family: Arial, sans-serif;
        }
        
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
          color: white;
        }
      </style>
    </head>
    <body>
      <header>
        <img src="https://cdn.discordapp.com/attachments/1091730813529374777/1098218919065559060/books4all.png" alt="Logo de Books4All">
        <h1>Welcome to Books4All!</h1>
      </header>
      <h3>The user ${user} has been successfully created</h3>
      <br><br>
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
    </body>
  </html>
    `,
  });
};

module.exports = { notificationNewUser };
