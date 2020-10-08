const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./api/auth/auth.router");
const contactsRouter = require("./api/contacts/router");
const usersRouter = require("./api/users/users.router");

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

    app.use("/api/auth", authRouter);
    app.use("/api/contacts", contactsRouter);
    app.use("/api/users", usersRouter);

    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

runServer();
