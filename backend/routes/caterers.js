const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/caterers.json");

function readData() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// GET /api/caterers
router.get("/", (req, res) => {
  const caterers = readData();
  res.json({ success: true, data: caterers });
});

// GET /api/caterers/:id
router.get("/:id", (req, res) => {
  const caterers = readData();
  const caterer = caterers.find((c) => c.id === req.params.id);
  if (!caterer) {
    return res.status(404).json({ success: false, message: "Caterer not found" });
  }
  res.json({ success: true, data: caterer });
});

// POST /api/caterers
router.post("/", (req, res) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  const errors = [];
  if (!name || typeof name !== "string" || name.trim() === "") {
    errors.push("name is required and must be a non-empty string");
  }
  if (!location || typeof location !== "string" || location.trim() === "") {
    errors.push("location is required and must be a non-empty string");
  }
  if (pricePerPlate === undefined || typeof pricePerPlate !== "number" || pricePerPlate <= 0) {
    errors.push("pricePerPlate is required and must be a positive number");
  }
  if (!cuisines || !Array.isArray(cuisines) || cuisines.length === 0) {
    errors.push("cuisines is required and must be a non-empty array");
  }
  if (rating === undefined || typeof rating !== "number" || rating < 1 || rating > 5) {
    errors.push("rating is required and must be a number between 1 and 5");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const caterers = readData();
  const newCaterer = {
    id: uuidv4(),
    name: name.trim(),
    location: location.trim(),
    pricePerPlate,
    cuisines,
    rating,
  };

  caterers.push(newCaterer);
  writeData(caterers);

  res.status(201).json({ success: true, data: newCaterer });
});

module.exports = router;
