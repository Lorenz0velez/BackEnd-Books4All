const server = require("./src/app");
const getAllBooks = require("./src/controllers/getAllBooks");
const { getDeletedBooks } = require("./src/controllers/putBookController");
const { getBooks } = require("./src/controllers/SaveApiData");
const { createRoles } = require("./src/controllers/saveRoles");
const { sequelize } = require("./src/DB_connection");
const port = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(async () => {
  console.log("connected database, master");
  const books = await getAllBooks();
  await getDeletedBooks();

  createRoles();
  server.listen(port, () => {
    console.log("listening on port " + port);
    if (books.length > 0) return;
    else {
      getBooks();
    }
  });
});
