const express = require('express')
const foodPartnerController = require('../controllers/foodpartner.controller')
const authMiddleware = require('../middlewares/auth.middleware')

const router = express.Router();

    /*GET /api/food/foodpartner/:id*/
router.get("/:id",
    authMiddleware.authUserMiddleware,
    foodPartnerController.getFoodPartnerById) 

module.exports = router;