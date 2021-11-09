// USED FOR STARTING THEAPPLICATION
////////////// THE ACTUAL EXPRESS APPLICATION STARTS //////////////
const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});

////////////// THE ACTUAL EXPRESS APPLICATION ENDS //////////////

const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");

const mongoose = require("mongoose");
require("dotenv").config();
const Note = require("./models/note");
const { response } = require("express");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

// mongoose.connect(url);

// const Note = mongoose.model("Note", noteSchema);

// app.get("/", (request, response) => {
//   response.send("<h1>Hello World!</h1>");
// });

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
