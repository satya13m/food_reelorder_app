const foodPartnerModel = require("../models/foodPartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;

  //if token not present
  if (!token) {
    return res.status(401).json({ message: "FoodPartner token is not accessible" });
  }

  //check a token if its verify or not
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.token.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ message: "User token is not accessible" });
  }

  //exist or not token or valid token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
}

module.exports = { authFoodPartnerMiddleware, authUserMiddleware };
