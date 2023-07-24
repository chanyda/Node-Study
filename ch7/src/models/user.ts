import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
    public id: number;
    public name: string;
    public age: number;
    public married: boolean;
    public comment: string;
}

export async function initializeUser(sequelize: Sequelize) {
    User.init(
        {
            name: {
                type: new DataTypes.STRING(),
                allowNull: false,
                unique: true,
            },
            age: {
                type: new DataTypes.INTEGER(),
                allowNull: false,
            },
            married: {
                type: new DataTypes.BOOLEAN(),
                allowNull: false,
            },
            comment: {
                type: new DataTypes.STRING(),
                allowNull: true,
            },
        },
        {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: "User",
            tableName: "users",
            paranoid: false,
        }
    );
}
