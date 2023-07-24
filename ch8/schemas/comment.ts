import mongoose from "mongoose";

const { Schema } = mongoose;
// nested object 혹은 populator 사용
// nested object는 update, delete 시에 번거롭고, populator는 join 비용이 많이 발생(속도도 느림)
const commentSchema = new Schema({
    commenter: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    comment: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Comment", commentSchema);
