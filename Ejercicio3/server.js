require("dotenv").config();

const express = require("express");
const app = express();
const chalck = require("chalk");

console.log(__filename);

app.use((req, res, next) => {
  const reqInfo = {
    requestType: req.method,
    requestURL: req.originalUrl,
    reqParams: req.params,
    reqProtocol: req.protocol,
    reqBody: req.body,
    reqQuery: req.query,
  };
  console.log(reqInfo);

  next();
});
app.get("/hour", (req, res) => {
  res.send(new Date().toLocaleTimeString());
});

app.get("/code", (req, res) => {
  res.send(__dirname);
});

const { API_PORT, API_HOST } = process.env;
app.listen(API_PORT, () => {
  console.log(
    chalck.black.bgWhite.bold(`API funcionando en ${API_HOST}:${API_PORT}`)
  );
});

app.use((error, req, res, next) => {
  console.error(error);
  res.statusCode = 500;
  res.send("Something went wrong :(");
});

app.use((req, res) => {
  res.statusCode = 404;
  res.send("not found :(");
});
