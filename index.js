const express = require("express");
const app = express();
const port = 3001;

//API Routes
const routes = require("./routes/index");
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

//Export app to be used in tests
module.exports = { app };
