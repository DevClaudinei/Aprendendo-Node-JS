import IncorrectRequest from "../errors/IncorrectRequest.js";

async function page(req, res, next) {
    try {
        let { limit = 5, page = 1, ordination = "title:1"} = req.query;
        const [sortingField, order] = ordination.split(":");

        limit = parseInt(limit);
        page = parseInt(page);
        
        const result = req.result;

        if (limit > 0 && page > 0) {
            const resultPage = await result.find()
                .skip((page - 1) * limit)
                .sort({[sortingField]: order})
                .limit(limit)
                .exec();
            res.status(200).json(resultPage);
        } else {
            next(new IncorrectRequest());
        }
    } catch (err) {
        next(err);
    }
}

export default page;