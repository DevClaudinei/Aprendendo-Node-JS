import express from "express";
import booksController from "../controllers/booksController.js";

const router = express.Router();

router
    .get("/books", booksController.getBooks)
    .get("/books/get", booksController.getBookByPublisher)
    .get("/books/:id", booksController.getBookById)
    .post("/books", booksController.registerBook)
    .put("/books/:id", booksController.updatedBook)
    .delete("/books/:id", booksController.deletedBook);

export default router;