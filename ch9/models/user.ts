import { DataTypes, HasManyAddAssociationMixin, HasManyRemoveAssociationMixin, Model, Sequelize } from "sequelize";
import Post from "./post";

type ProviderType = "local" | "kakao";

class User extends Model {
    public readonly id: number;
    public email: string;
    public nick: string;
    public password: string;
    public provider: ProviderType;
    public sns_id: string;
    public addFollowing: HasManyAddAssociationMixin<User, number>;
    public removeFollowing: HasManyRemoveAssociationMixin<User, number>;

    static initiate(sequelize: Sequelize) {
        User.init(
            {
                email: {
                    type: DataTypes.STRING(40),
                    allowNull: true,
                    unique: true,
                },
                nick: {
                    type: DataTypes.STRING(15),
                    allowNull: false,
                },
                password: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                provider: {
                    type: DataTypes.ENUM("local", "kakao"),
                    allowNull: false,
                    defaultValue: "local",
                },
                sns_id: {
                    type: DataTypes.STRING(30),
                    allowNull: true,
                },
            },
            {
                sequelize,
                underscored: true,
                timestamps: true,
                modelName: "User",
                tableName: "users",
                paranoid: true, // deleted_at 추가 (soft delete)
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate() {
        User.hasMany(Post);
        // 팔로워
        User.belongsToMany(User, { foreignKey: "following_id", as: "followers", through: "Follow" });
        User.belongsToMany(User, { foreignKey: "follower_id", as: "followings", through: "Follow" });
    }
}

export default User;
