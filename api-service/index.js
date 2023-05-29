const express = require("express");
const app = express.Router();
const axios = require("axios");
const { LAST_MILE_SERVICE } = require("./service-discovery");

const api = express();
api.use("/api", app);

app.get("/", (req, res) => {
  console.log("in api service");
  res
    .status(200)
    .send({ status: "success", message: "Hello from api service" });
});

app.get("/orders", async (req, res) => {
  try {
    const response = await axios.default.get(
      LAST_MILE_SERVICE + "/lastmile/orders"
    );
    console.log("response ok");
    res.status(200).send(response.data);
  } catch (error) {
    console.log("error while requesting api service", error.message);
    res.status(500).send({ status: "fail", message: error.message });
  }
});

api.listen(8081, () => {
  console.log("api service started on port 8081");
});
