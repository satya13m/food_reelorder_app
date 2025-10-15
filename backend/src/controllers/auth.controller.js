const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const foodPartnerModel = require('../models/foodPartner.model');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExisted = await userModel.findOne({email})
    
    if(isUserAlreadyExisted){
        return res.status(400).json({message:"User already exists"})
    }

    //if not existed
    const hashedPassword = await bcrypt.hash(password,10);

    //cerate new user
    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    //create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token)
    res.status(201).json({message:"User registered successfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName
        }
    })

}

async function loginUser(req, res) {
    const {email,password} = req.body;

    const user = await userModel.findOne({email});

    if(!user){
        return res.status(400).json({message:"Invalid email or password"});
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if(!isValidPassword){
        return res.status(400).json({message:"Invalid credentials"});
    }

    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("token",token)
    res.status(200).json({message:"User logged in successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullName:user.fullName
    }
  })
}

function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;

    const isFoodPartnerAlreadyExisted = await foodPartnerModel.findOne({email})

    if(isFoodPartnerAlreadyExisted){
        return res.status(400).json({message:"Food Partner already exists"})
    }

    //create password->if not exist
    const hashedPassword = await bcrypt.hash(password,10);

    //create new food partner
    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword
    })

    //create a token 
    const token = jwt.sign({id:foodPartner._id},process.env.JWT_SECRET)

    res.cookie("token",token)
    res.status(201).json({message:"Food Partner registered successfully",
    foodPartner:{
        _id:foodPartner._id,
        email:foodPartner.email,
        name:foodPartner.name
    }
})
}

async function loginFoodPartner(req, res) {
    const {email,password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({email});

    if(!foodPartner){
        return res.status(400).json({message:"Invalid email or password"});
    }
    const isValidPassword = await bcrypt.compare(password,foodPartner.password);

    if(!isValidPassword){
        return res.status(400).json({message:"Invalid credentials"});
    }   
    //token
    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET);
    res.cookie("token",token)
    res.status(200).json({message:"Food Partner logged in successfully",
    foodPartner:{
        _id:foodPartner._id,
        email:foodPartner.email,
        name:foodPartner.name
    }
  })
}

function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({message: "Food Partner logged out successfully" });
}

module.exports = { loginUser, logoutUser, registerFoodPartner, loginFoodPartner, logoutFoodPartner, registerUser };