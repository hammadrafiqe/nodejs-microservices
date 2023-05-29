const express = require("express");
const app = express();
const { app: lastmile } = require("./last-mile-controller");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/lastmile", lastmile);

app.listen(8082, () => {
  console.log("last mile service started on 8082");
});
