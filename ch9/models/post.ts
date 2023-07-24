import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";
import Hashtag from "./hashtag";

class Post extends Model {
    static initiate(sequelize: Sequelize) {
        Post.init(
            {
                content: {
                    type: DataTypes.STRING(140),
                    allowNull: false,
                },
                img: {
                    type: DataTypes.STRING(200),
                    allowNull: true,
                },
            },
            {
                sequelize,
                underscored: true,
                timestamps: true,
                paranoid: false,
                modelName: "Post",
                tableName: "posts",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate() {
        Post.belongsTo(User);
        Post.belongsToMany(Hashtag, { through: "post_hashtag" });
    }
}

export default Post;
