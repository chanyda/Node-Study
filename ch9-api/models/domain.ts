import { DataTypes, Model, Sequelize } from "sequelize";
import User from "./user";

type DomainType = "free" | "premium";

class Domain extends Model {
    public readonly id: number;
    public host: string;
    public type: DomainType;
    public client_secret: string;

    static initiate(sequelize: Sequelize) {
        Domain.init(
            {
                host: {
                    type: DataTypes.STRING(80),
                    allowNull: false,
                },
                type: {
                    type: DataTypes.ENUM("free", "premium"),
                    allowNull: false,
                },
                client_secret: {
                    type: DataTypes.UUID,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                paranoid: true,
                underscored: true,
                modelName: "Domain",
                tableName: "domains",
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate() {
        Domain.belongsTo(User);
    }
}

export default Domain;
