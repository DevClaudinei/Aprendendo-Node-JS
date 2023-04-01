import NotFound from "../errors/NotFound.js";
import books from "../models/Book.js";

class booksController {

    static getBooks = async (req, res, next) => {
        try {
            const booksFound = await books.find()
                .populate("author")
                .exec();
            res.status(200).json(booksFound);
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

    static getBookByPublisher = async (req, res, next) => {
        const publisher = req.query.publisher;

        try {
            const bookFound = await books.find({"publisher": publisher});

            if (bookFound !== null) {
                res.status(200).send(bookFound);
            } else {
                next(NotFound(`Book for Id: ${publisher} not found`));
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

export default booksController;