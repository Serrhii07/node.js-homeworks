const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const contactsRouter = require("./api/contacts/router");

const PORT = process.env.PORT || 3000;
const app = express();

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connection successful");

    app.use(morgan("dev"));

    app.use(cors());

    app.use(express.json());

    app.use("/api/contacts", contactsRouter);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runServer();
