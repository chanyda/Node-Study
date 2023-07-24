import { DataTypes, Model, Sequelize } from "sequelize";

export class Comment extends Model {
    public id: number;
    public comment: string;
}

export async function initializeComment(sequelize: Sequelize) {
    Comment.init(
        {
            comment: {
                type: new DataTypes.STRING(),
                allowNull: false,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "Comment",
            tableName: "comments",
            paranoid: false,
        }
    );
}
