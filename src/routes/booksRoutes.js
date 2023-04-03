import express from "express";
import booksController from "../controllers/booksController.js";
import page from "../middleware/page.js";

const router = express.Router();

router
    .get("/books", booksController.getBooks, page)
    .get("/books/get", booksController.getBookByFilter, page)
    .get("/books/:id", booksController.getBookById)
    .post("/books", booksController.registerBook)
    .put("/books/:id", booksController.updatedBook)
    .delete("/books/:id", booksController.deletedBook);

export default router;