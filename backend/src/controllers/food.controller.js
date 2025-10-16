const foodModel = require("../models/food.model");
const storageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    console.log("Food partner:", req.foodPartner);
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Extract file extension (default to mp4 if missing)
    const originalName = req.file.originalname;
    const fileExtension = originalName.split(".").pop() || "mp4";

    // Generate unique filename with extension
    const fileName = `${uuid()}.${fileExtension}`;

    // Upload file to ImageKit
    const fileUpload = await storageService.uploadFile(
      req.file.buffer,
      fileName
    );

    console.log("Upload successful:", fileUpload);



    // Save food data to MongoDB
    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUpload.url, // URL now has proper file extension
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error in createFood:", error);
    return res
      .status(500)
      .json({ error: error.message || "Something went wrong" });
  }
}


module.exports = { createFood };
