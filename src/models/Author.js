import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        id: {type: String},
        name: {
            type: String,
            required: [true, "author name field is required"]
        },
        nationality: {type: String}
    }
);

const authors = mongoose.model("authors", authorSchema);

export default authors;