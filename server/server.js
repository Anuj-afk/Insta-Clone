import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config"
import bcrypt from 'bcrypt';
import {nanoid} from 'nanoid';
import jwt from "jsonwebtoken";
import cors from "cors";
import admin    from "firebase-admin"
import { readFileSync } from 'fs';

const serviceAccount = JSON.parse(
    readFileSync('./instagram-clone-59a5e-firebase-adminsdk-hmh6t-4869929c6e.json', 'utf-8')
);

import {getAuth} from "firebase-admin/auth"
import aws from "aws-sdk";

import User from './Schema/User.js';
import Post from './Schema/Post.js';

const server = express();
server.use(express.json());
server.use(cors());
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password


mongoose.connect(process.env.DB_LOCATION, {
    autoIndex: true,
})

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1"
})

const generateUploadUrl = async () => {
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime}.jpeg`
    return await s3.getSignedUrlPromise("putObject", {
        Bucket: "instagram-clone-project-bucket",
        Key: imageName,
        Expires: 60 * 60, // 1 hour
        ContentType: "image/jpeg",
    })
}

const verifyJwt = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        return res.status(401).json({"error": "No token provided"})
    }
    jwt.verify(token, process.env.SECRET_ACCESS_KEY, (err, user) => {
        if(err) {
            return res.status(403).json({"error": "Invalid token"})
        }
        req.user = user.id;
        next();
    })
}


server.get("/get-upload-url", (req, res) => {
    generateUploadUrl().then((url) => {
        return res.status(200).json({uploadUrl: url})
    }).catch((err) => {
        console.log(err.message);
        return res.status(500).json({"error": "Failed to generate upload URL"})
    })
})


const formatDatatoSend = (user) => {
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
            return res.status(200).json(formatDatatoSend(result))
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
                    return res.status(200).json(formatDatatoSend(user))
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

server.post("/google-auth", async (req, res) =>{
    let {access_token} = req.body;
    getAuth().verifyIdToken(access_token)
    .then(async (decodedUser) => {

        let {email, name, picture} = decodedUser;
        picture = picture.replace("s96-c", "s384-c")

        let user = await User.findOne({"personal_info.email": email}).select("personal_info.fullname personal_info.username personal_info.profile_img google_auth").then((u) => {
            return u || null;
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({"error": err.message})
        })
        if(user){
            if(!user.google_auth){
                return res.status(403).json({"error": "This email was signed up without google. Please log in with password to access the account" })
            }
        }
        else{
            let username = await generateUsername(email);

            user = new User({
                personal_info: {fullname: name, email, profile_img: picture, username},
                google_auth: true
            });

            await user.save().then((u) => {
                user = u;
            })
            .catch((err) => {
                return res.status(500).json({"error": err.message})
            })
        }

        return res.status(200).json(formatDatatoSend(user));
    })
    .catch(err => {
        return res.status(500).json({"error": "Error occured while login please try again"});
    })
})

server.post("/get-profile", (req, res) => {
    let {username} = req.body;
    User.findOne({"personal_info.username": username})
    .select("-personal_info.password -google_auth -updatedAt -blogs -joinedAt -_id")
    .then((user) => {
        return res.status(200).json(user)
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": err.message})
    })
})

server.post("/post", verifyJwt, (req, res) => {
    let userId = req.user;

    let {des, likes_hide, comment_hide, link} = req.body;
    if(!des.length){
        return res.status(403).json({"error": "Description is required"})
    }
    if(!link.length){
        return res.status(403).json({"error": "Link is required"})
    }
    let post_id = Math.floor(Math.random() * 1000000000000);
    let posts = new Post({
        des, likes_hide, comment_hide, link, post_id, author: userId
    })

    posts.save().then((post) => {
        let incrementVal = 1;
        User.findByIdAndUpdate(userId, {$inc: {"account_info.total_posts": incrementVal}, $push: {"posts": post._id}})
        .then(user => {
            return res.status(200).json({id: posts.post_id})
        })
        .catch(err => {
            console.log(err.message);
            return res.status(500).json({"error": "failed to upload total posts number"})
        })
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": "error occured while creating post"})
    })
    

})


server.post("/latest-posts", (req, res) => {
    let {page} = req.body;
    let maxLimit = 5;
    Post.find().populate("author", "personal_info.fullname personal_info.profile_img personal_info.username -_id")
    .sort({"publishedAt": -1})
    .skip((page-1)*maxLimit)
    .select("post_id des activity.total_likes activity_total_comments activity.total_views link comments likes_hide comment_hide")
    .limit(maxLimit)
    .then(post => {
        return res.status(200).json({post})
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": "error occured while fetching latest posts"})
    })
})

server.post("/all-latest-posts-count", (req, res) => {
    Post.countDocuments()
    .then(count => {
        return res.status(200).json({totalDocs: count})
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": "error occured while fetching total posts"})
    })
})

server.post("/like", (req, res) => {
    let {post_id, val} = req.body;
    console.log(post_id)
    Post.findByIdAndUpdate(post_id, {$inc: {"activity.total_likes": val}})
    // Post.findOne({post_id})
    .then(post => {
        console.log(post)
        return res.status(200).json({likes: post.activity.total_likes})
    })
    .catch(err => {
        console.log(err.message);
        return res.status(500).json({"error": "error occured while liking post"})
    })
})

let port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});