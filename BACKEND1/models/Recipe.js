// const mongoose = require("mongoose");

// const recipeSchema = new mongoose.Schema({
//   title: String,
//   ingredients: [String],
//   instructions: String,
// });

// const Recipe = mongoose.model("Recipe", recipeSchema);

// module.exports = Recipe;



const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  imageUrl: { type: String }, // Optional: Store image URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
