const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/config"); // Adjust the path as needed

try {
  const Attendance = sequelize.define(
    "attendance",
    {
      attendanceid: {  
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("P", "A", "H"),
      },
      date: {
        type: DataTypes.DATE,
      },
      createdby: {
        type: DataTypes.INTEGER,
      },
      createdat: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "attendance",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );

  module.exports = Attendance;
} catch (error) {
  console.error("Error defining Sequelize model:", error);
}
