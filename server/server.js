import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import bcrypt from 'bcrypt';
import {nanoid} from 'nanoid';
import jwt from "jsonwebtoken";
import cors from "cors";

import User from './Schema/User.js';

const server = express();
server.use(express.json());
server.use(cors());
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
})

const formaDatatoSend = (user) => {
    const accessToken = jwt.sign({id: user._id}, process.env.SECRET_ACCESS_KEY)
    return {
        accessToken,
        profile_img: user.personal_info.profile_img,
        username: user.personal_info.username,
        fullname: user.personal_info.fullname,
    }
}

const generateUsername = async (email) => {
    let username = email.split('@')[0];

    let usernameExists = await User.exists({"personal_info.username": username}).then((result) => result)
    usernameExists ? username += nanoid().substring(0, 5): "";

    return username;
}

server.post("/signup", (req, res) => {
    let {fullname, email, password} = req.body;
    if(fullname.length < 3){
        return res.status(403).json({"error": "Fullname must be at least 3 characters long"});
    }
    if(!email.length){
        return res.status(403).json({"error": "Enter Email"})
    }
    if(!emailRegex.test(email)){
        return res.status(403).json({"error": "Email is invalid"});
    }
    if(!passwordRegex.test(password)){
        return res.status(403).json({"error": "Password should contain at least one uppercase letter, one lowercase letter,number and be at least 6 characters long"});
    }
    bcrypt.hash(password, 10, async (err, hashed_password) => {
        let username = await generateUsername(email);

        let user = new User({
            personal_info: {fullname, email, password: hashed_password, username}
        })
        user.save().then((result) => {
            return res.status(200).json(formaDatatoSend(result))
        })
        .catch((err) => {
            if(err.code == 11000){
                return res.status(403).json({"error": "Email already exists"})
            }
            return res.status(500).json({"error": err.message})
        })
    })
})

server.post("/signin", (req, res) => {
    let {email, password} = req.body;
    console.log("🚀 ~ server.post ~ email:", email)
    User.findOne({"personal_info.email": email})
    .then((user) => {
        if(!user){
            return res.status(403).json({"error": "Email not found"})
        }
        if(!user.google_auth){
            bcrypt.compare(password, user.personal_info.password, (err, result) => {
                if(err){
                    return res.status(500).json({"error": err.message})
                }
                if(!result){
                    return res.status(403).json({"error": "Incorrect Password"})
                }
                else{
                    return res.status(200).json(formaDatatoSend(user))
                }
            })
        }
        else{
            return res.status(403).json({"error": "This email was signed up without password. Please login with google to access the account"})
        }
    })
    .catch((err) => {
        console.log("🚀 ~ server.post ~ err:", err)
        return res.status(500).json({"error": err.message});
    })

})

let port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});