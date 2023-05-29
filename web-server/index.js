const express = require("express");
const app = express();
const axios = require("axios");
const { API_SERVICE, LAST_MILE_SERVICE } = require("./service-discovery");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  console.log("calling api gateway");
  res
    .status(200)
    .send({ status: "success", message: "Hello from api gateway" });
});

app.post("/", (req, res) => {
  res.send("working");
});

app.use("/api", async (req, res) => {
  console.log("calling api service");
  try {
    const response = await axios.default.request({
      url: API_SERVICE + req.originalUrl,
      method: req.method,
      data: req.body,
    });
    console.log("response ok");
    res.status(200).send(response.data);
  } catch (error) {
    console.log("error while requesting api service", error.message);
    if (error.response)
      return res.status(error.response.status).send(error.response.data);
    res.status(500).send({ status: "fail", message: error.message });
  }
});

app.use("/lastmile", async (req, res) => {
  console.log("calling last mile service", LAST_MILE_SERVICE + req.originalUrl);
  try {
    const response = await axios.default.request({
      url: LAST_MILE_SERVICE + req.originalUrl,
      method: req.method,
      data: req.body,
    });
    console.log("response ok");
    res.status(200).send(response.data);
  } catch (error) {
    console.log("error while requesting last mile service", error.message);
    if (error.response)
      return res.status(error.response.status).send(error.response.data);
    res.status(500).send({ status: "fail", message: error.message });
  }
});

app.listen(8080, () => {
  console.log("api gateway started successfully at port 8080");
});
