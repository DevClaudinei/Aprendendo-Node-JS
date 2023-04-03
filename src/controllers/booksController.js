import NotFound from "../errors/NotFound.js";
import { authors, books } from "../models/index.js";

class booksController {

    static getBooks = async (req, res, next) => {
        try {
            const searchBooks = books.find().populate("author");

            req.result = searchBooks;

            next();
        } catch (err) {
            next(err);
        }
    };

    static getBookById = async (req, res, next) => {
        const id = req.params.id;

        try {
            const bookFound = await books.findById(id)
                .populate("author", "name")
                .exec();

            if (bookFound !== null) {
                res.status(200).send(bookFound);
            } else {
                next(NotFound(`Book for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };

    static getBookByFilter = async (req, res, next) => {
        try {
            const search = await createSearch(req.query);

            if (search !== null) {
                const bookFound = books.find(search)
                    .populate("author");

                req.result = bookFound;
                next(); 
            } else {
                res.status(200).send([]);
            } 
        } catch (err) {
            next(err);
        }
    };

    static registerBook = async (req, res, next) => {
        let book = new books(req.body);
        
        try{
            await book.save();
            res.status(201).send(book.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static updatedBook = async (req, res, next) => {
        const id = req.params.id;

        try{
            let updatedBook = await books.findByIdAndUpdate(id, {$set: req.body});

            if (updatedBook !== null) {
                res.status(200).send("Author successfully updated");
            } else {
                next(NotFound(`Book for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };

    static deletedBook = async (req, res, next) => {
        const id = req.params.id;

        try {
            let deletedBook = await books.findByIdAndDelete(id);

            if (deletedBook !== null) {
                res.status(204).send("Author deleted successfully");
            } else {
                next(NotFound(`Book for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };
}

async function createSearch(parameters) {
    const { title, publisher, minPage, maxPage, authorName } = parameters;
    
    let search = {};
    
    if (publisher) search.publisher = publisher;

    if (title) search.title = { $regex: title, $options: "i" };

    if (minPage | maxPage) search.numberOfPage = {};

    if (minPage) search.numberOfPage.$gte = minPage;

    if (maxPage) search.numberOfPage.$lte = maxPage;

    if (authorName) {
        const author = await authors.findOne({name: authorName});

        if (author !== null) {
            search.author = author._id;
        } else {
            search = null;
        }
    }

    return search;
}

export default booksController;