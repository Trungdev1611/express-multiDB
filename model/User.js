import { DataTypes, Model } from "sequelize";
import sequelizeConnect from "../config/db.js";
class UserModel extends Model { }

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING, // k cần type: DataTypes.STRING(100) vì postgre không giới hạn
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    created_at: {
        type: DataTypes.DATE,
        // defaultValue: DataTypes.NOW,
        defaultValue: sequelizeConnect.literal("CURRENT_TIMESTAMP"),
    },
}, {
    sequelize: sequelizeConnect,
    modelName: "User",
    tableName: "users",
    timestamps: false,
})
export default UserModel