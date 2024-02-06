const express = require("express");
const postRouter = express.Router();
const auth = require("../middlewares/auth");
const Post = require("../models/post");
const JWT = require('jsonwebtoken');

//get User
postRouter.post("/api/posts", auth, async (req, res) => {
    try {
        /*  JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY,(err,user)=>{
             if (err) return res.status(httpStatus.FORBIDDEN).send({error:"Token süresi geçmiş"});
             req.user=user._doc;
             console.log("filessssssss", user._doc);
             //req.user_id=user._doc._id
             next();
         }) */
        const userId = req.user.id;
        const { description, likes, commentId } = req.body
        console.log("userIdddd", userId);
        console.log("filessssssss", req.user);
        let posts = new Post({ description, userId });
        posts = await posts.save();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
postRouter.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
postRouter.get("/api/posts/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const posts = await Post.find({ id: id });
        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
postRouter.delete("/api/posts/:id", auth, async (req, res) => {
    try {
        const id = req.params.id

        console.log("iddddd", id);
        const posts = await Post.findByIdAndRemove(req.params.id);

        res.json(posts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});




module.exports = postRouter;