const express = require('express');
const foodController = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const multer = require("multer")

const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router();

router.post("/", 
    authMiddleware.authFoodPartnerMiddleware, 
    upload.single("video"), 
    foodController.createFood);

router.get("/", (req, res) => {
    res.send("Food route is working");
});

module.exports = router;