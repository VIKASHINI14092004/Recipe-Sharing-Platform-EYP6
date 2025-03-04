// // require("dotenv").config();
// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const app = express();
// // app.use(express.json()); // Enable JSON parsing
// // app.use(cors()); // Enable frontend access

// // const PORT = process.env.PORT || 5000;

// // // Connect to MongoDB Atlas
// // mongoose
// //   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// //   .then(() => console.log("MongoDB Connected"))
// //   .catch((err) => console.error(err));

// // // Simple route
// // app.get("/", (req, res) => {
// //   res.send("Recipe API is running...");
// // });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


// Import Routes
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/auth", authRoutes);



const recipeRoutes = require("./routes/recipeRoutes.js");
app.use("/api/recipes", recipeRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
