const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/config"); // Adjust the path as needed

try {
  const Employee = sequelize.define(
    "employee",
    {
      id: {  
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.TEXT,
      },
      bankdetails: {
        type: DataTypes.TEXT,
      },
      joindate: {
        type: DataTypes.DATE,
      },
      come_through: {
        type: DataTypes.STRING,
      },
      resigndate: {
        type: DataTypes.DATE,
      },
      photo: {
        type: DataTypes.STRING,
      },
      cphoto: {
        type: DataTypes.STRING,
      },
      resume: {
        type: DataTypes.STRING,
      },
     idproof: {
        type: DataTypes.STRING,
      },
      upicode: {
        type: DataTypes.STRING,
      },
      basicsalary: {
        type: DataTypes.STRING,
      },
      incrementamount: {
        type: DataTypes.STRING,
      },
      incrementdate: {
        type: DataTypes.DATE,
      },
      resign: {
        type: DataTypes.ENUM('Y','N'),
      },
      createdby: {
        type: DataTypes.INTEGER,
      },
      createdat: {
        type: DataTypes.DATE,
      },
      accountdetails: {
        type: DataTypes.STRING,
      },
      father_phone: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "employees",
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

  module.exports = Employee;
} catch (error) {
  console.error("Error defining Sequelize model:", error);
}
