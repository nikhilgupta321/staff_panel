const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/config"); // Adjust the path as needed
  
try {
  const Salary = sequelize.define(
    "salary",
    {
      salaryid: {  
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      employeeid: {
        type: DataTypes.INTEGER,
      },
      amount: {
        type: DataTypes.DECIMAL,
      },
      date: {
        type: DataTypes.DATE,
      },
      remark: {
        type: DataTypes.INTEGER,
      },
      createdby: {
        type: DataTypes.INTEGER,
      },
      createdat: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "salaries",
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

  module.exports = Salary;
} catch (error) {
  console.error("Error defining Sequelize model:", error);
}
