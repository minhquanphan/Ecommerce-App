require("dotenv").config();
const mongoURI = process.env.MONGO_DEV_URI;
const mongoose = require("mongoose");

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log(`DB connected`);
    createDatabase();
  })
  .catch((err) => console.log(err));

const data = require("./data/data.json");
const Product = require("./models/Product");

const createDatabase = async () => {
  await Product.collection.drop();
  for (let i = 0; i < 400; i++) {
    let product = await Product.create({
      name: data[i].Name,
      brand: data[i].Brand,
      description: data[i].Description,
      notes: data[i].Notes,
      price: Math.floor(Math.random() * (200 - 100 + 1)) + 50,
      countInStock: Math.floor(Math.random() * (10 - 2 + 1)) + 2,
      imageUrl: data[i]["Image URL"],
    });
  }
  console.log("Done");
};
