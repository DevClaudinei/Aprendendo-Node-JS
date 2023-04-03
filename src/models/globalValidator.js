import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (value) => value !== "",
    message: ({ path }) => `String type field ${path} cannot be empty.`
});