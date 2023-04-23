const express = require("express");
const cors = require("cors");
// const loki = require("lokijs");
const app = express();
const port = 3002;

const { handler } = require("./func/dopa");

// const db = new loki("running.db");

// Add a collection to the database
// const items = db.addCollection("run");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/dopa", async (req, res) => {
  console.log(` request time: ${new Date(Date.now()).toISOString()}`);

  const ret = await handler(req);

  console.log(ret);
  res.status(ret.statusCode).send(JSON.parse(ret.body));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
