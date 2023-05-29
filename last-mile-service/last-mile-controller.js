const express = require("express");

const app = express.Router();

let data = {};
let tracking = 0;
app.get("/", (req, res) => {
  console.log("last mile service called");
  res
    .status(200)
    .send({ status: "success", message: "Hello from last mile service" });
});

app.get("/order", (req, res) => {
  console.log("getting order with id: ", req.query);
  if (!req.query.referenceNumber && !req.query.trackingNumber) {
    return res
      .status(400)
      .send({ status: "fail", message: "invalid params", data: null });
  }

  const order =
    (req.query.referenceNumber &&
      Object.values(data).filter(
        (e) => e.referenceNumber === req.query.referenceNumber
      )) ||
    (req.query.trackingNumber &&
      Object.values(data).filter(
        (e) => e.trackingNumber === req.query.trackingNumber
      )) ||
    [];
  if (order.length == 0)
    return res.status(404).send({
      status: "fail",
      message:
        "order not found with query " +
        (req.query.trackingNumber || req.query.referenceNumber),
      data: null,
    });

  res.status(200).send({
    status: "success",
    message: null,
    data: order,
  });
});

app.get("/orders", (req, res) => {
  console.log("getting all orders");
  res
    .status(200)
    .send({ status: "success", message: null, data: Object.values(data) });
});

app.post("/orders", (req, res) => {
  if (!req.body || !req.body.referenceNumber)
    return res
      .status(400)
      .send({ status: "fail", message: "invalid body", data: null });
  console.log("creating new order", JSON.stringify(req.body));
  const order = data[req.body.referenceNumber];
  if (order)
    return res.status(400).send({
      status: "fail",
      message:
        "order already exist with tracking number " + req.body.referenceNumber,
      data: null,
    });
  let trackingNumber = "LM" + ++tracking;
  data = {
    ...data,
    [req.body.referenceNumber]: {
      ...req.body,
      trackingNumber,
    },
  };
  res.status(200).send({
    status: "success",
    message: "order created with tracking number " + trackingNumber,
    data: null,
  });
});

exports.app = app;
