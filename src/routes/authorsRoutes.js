import express from "express";
import authorsController from "../controllers/authorsController.js";
import page from "../middleware/page.js";

const router = express.Router();

router
    .get("/authors", authorsController.getAuthors, page)
    .get("/authors/:id", authorsController.getAuthorById)
    .post("/authors", authorsController.registerAuthor)
    .put("/authors/:id", authorsController.updatedAuthor)
    .delete("/authors/:id", authorsController.deletedAuthor);

export default router;