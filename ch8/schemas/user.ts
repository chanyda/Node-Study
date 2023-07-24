import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    age: {
        type: Number,
        require: true,
    },
    married: {
        type: Boolean,
        require: true,
    },
    comment: String, // type만 정의할 경우 생략 가능 -> require: false
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("User", userSchema);
