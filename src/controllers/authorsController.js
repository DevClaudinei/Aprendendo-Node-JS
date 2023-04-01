import authors from "../models/Author.js";
import NotFound from "../errors/NotFound.js";

class authorsController {

    static getAuthors = async (req, res, next) => {
        try {
            const authorsFound = await authors.find();
            res.status(200).json(authorsFound);
        } catch (err) {
            next(err);
        }
    };

    static getAuthorById = async (req, res, next) => {
        const id = req.params.id;

        try {
            const authorFound = await authors.findById(id);

            if (authorFound !== null) {
                res.status(200).send(authorFound);
            } else {
                next(new NotFound(`Author for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };

    static registerAuthor = async (req, res, next) => {
        let author = new authors(req.body);
        
        try{
            await author.save();
            res.status(201).send(author.toJSON());
        } catch (err) {
            next(err);
        }
    };

    static updatedAuthor = async (req, res, next) => {
        const id = req.params.id;

        try{
            let updatedAuthor = await authors.findByIdAndUpdate(id, {$set: req.body});

            if (updatedAuthor !== null) {
                res.status(200).send("Author successfully updated");
            } else {
                next(new NotFound(`Author for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };

    static deletedAuthor = async (req, res, next) => {
        const id = req.params.id;

        try {
            let deletedAuthor = await authors.findByIdAndDelete(id);

            if (deletedAuthor !== null) {
                res.status(204).send("Author deleted successfully");
            } else {
                next(new NotFound(`Author for Id: ${id} not found`));
            }
        } catch (err) {
            next(err);
        }
    };
}

export default authorsController;
