import express from "express";
import authorsController from "../controllers/authorsController.js";

const router = express.Router();

router
    .get("/authors", authorsController.getAuthors)
    .get("/authors/:id", authorsController.getAuthorById)
    .post("/authors", authorsController.registerAuthor)
    .put("/authors/:id", authorsController.updatedAuthor)
    .delete("/authors/:id", authorsController.deletedAuthor);

export default router;