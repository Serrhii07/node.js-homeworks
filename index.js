const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const contactsRouter = require("./api/contacts/router");

const PORT = 3000;
const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
