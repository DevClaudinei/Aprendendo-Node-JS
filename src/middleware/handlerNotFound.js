import NotFound from "../errors/NotFound.js";

function handlerNotFound(req, res, next) {
    const errorNotFound = new NotFound();
    next(errorNotFound);
}

export default handlerNotFound;