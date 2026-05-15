const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const seedProducts = require("./seeders/product.seeder");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Security MySQL Sequelize running..." });
});

const PORT = process.env.PORT || 8080;

sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced successfully");
    await seedProducts();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database sync failed:", error.message);
  });