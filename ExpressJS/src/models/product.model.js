const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(15, 0),
      allowNull: false,
    },
    salePrice: {
      type: DataTypes.DECIMAL(15, 0),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    brand: {
      type: DataTypes.ENUM("Canon", "Sony", "Nikon", "Fujifilm", "Khác"),
      defaultValue: "Khác",
    },
    category: {
      type: DataTypes.ENUM("DSLR", "Mirrorless", "Compact", "Phụ kiện"),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isBestSeller: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

module.exports = Product;