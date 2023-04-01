import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import handlerError from "./middleware/handlerError.js";
import handlerNotFound from "./middleware/handlerNotFound.js";

db.on("error", console.log.bind(console, "There was a connection error!"));
db.once("open", () => {
    console.log("Connection with the database successfully completed!");
});

const app = express();
app.use(express.json());
routes(app);

app.use(handlerNotFound);

// eslint-disable-next-line no-unused-vars
app.use(handlerError);

export default app;