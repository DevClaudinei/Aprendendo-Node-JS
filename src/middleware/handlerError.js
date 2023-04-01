import mongoose from "mongoose";
import ErrorBase from "../errors/ErrorBase.js";
import IncorrectRequest from "../errors/IncorrectRequest.js";
import ValidationError from "../errors/ValidationError.js";
import NotFound from "../errors/NotFound.js";

// eslint-disable-next-line no-unused-vars
function handlerError(err, req, res, next)  {
    if (err instanceof mongoose.Error.CastError){
        new IncorrectRequest().sendResponse(res);
    } else if (err instanceof mongoose.Error.ValidationError) {
        new ValidationError(err).sendResponse(res);
    } else if(err instanceof NotFound) {
        err.sendResponse(res);
    } else{
        new ErrorBase().sendResponse(res);
    }
}

export default handlerError;