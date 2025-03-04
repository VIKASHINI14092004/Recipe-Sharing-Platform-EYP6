// const express = require("express");
// const Recipe = require("../models/Recipe"); // Make sure this model exists

// const router = express.Router();

// // Get all recipes
// router.get("/", async (req, res) => {
//   try {
//     const recipes = await Recipe.find();
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Add a new recipe
// router.post("/", async (req, res) => {
//   const { title, ingredients, instructions } = req.body;
//   try {
//     const newRecipe = new Recipe({ title, ingredients, instructions });
//     await newRecipe.save();
//     res.status(201).json(newRecipe);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("Recipe API is working");
// });

// module.exports = router;


const express = require("express");
const Recipe = require("../models/Recipe");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a Recipe (User must be logged in)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { title, ingredients, instructions, imageUrl } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      imageUrl,
      createdBy: req.user, // Extracted from authMiddleware
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get All Recipes
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name email");
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Get Recipes by a Specific User
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
