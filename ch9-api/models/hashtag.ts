import { DataTypes, HasManyGetAssociationsMixin, Model, Sequelize } from "sequelize";
import Post from "./post";

class Hashtag extends Model {
    public readonly id: number;
    public title: string;
    public getPosts: HasManyGetAssociationsMixin<Post>;

    static initiate(sequelize: Sequelize) {
        Hashtag.init(
            {
                title: {
                    type: DataTypes.STRING(15),
                    allowNull: false,
                    unique: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: false,
                underscored: true,
                modelName: "Hashtag",
                tableName: "hashtags",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate() {
        Hashtag.belongsToMany(Post, { through: "post_hashtag" });
    }
}

export default Hashtag;
