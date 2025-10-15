const foodPartnerModel = require('../models/foodPartner.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function authFoodPartnerMiddleware(req,res,next) {
    const token = req.cookies.token;

    //if token not present
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    //check a token if its verify or not
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner =foodPartner;
        next();

    } catch (error) {
        return res.status(401).json({message:"Invalid Token"});
    }
    
}

module.exports = { authFoodPartnerMiddleware };