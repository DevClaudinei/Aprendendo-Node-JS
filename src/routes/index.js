import express from "express";
import books from "./booksRoutes.js";
import authors from "./authorsRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({title: "Course of Node"});
    });

    app.use(
        express.json(),
        books,
        authors
    );
};

export default routes;