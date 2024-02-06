const express = require("express");
const commentRouter = express.Router();
const auth = require("../middlewares/auth");
const Comment = require("../models/comment");


//get User
commentRouter.post("/api/comments", async (req, res) => {
    try {
        const { comment } = req.body;
        let comments = new Comment({ comment });
        comments = await comments.save();
        res.json(comments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
commentRouter.get("/api/comments/list", async (req, res) => {
    try {
      
        let comments = await  Comment.find({});
       
        res.json(comments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
/*commentRouter.get("/api/comments/:commentId", async (req, res) => {
    try {
      
        let comments = new Comment.find({
            commentId: req.params.commentId
        });
       
        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});*/
commentRouter.get("/api/comments/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const comments = await Comment.findOne({ _id: id });
        res.json(comments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
commentRouter.delete("/api/comments/:id", auth, async (req, res) => {
    try {
        const id = req.params.id

        console.log("iddddd", id);
        const comments = await Comment.findByIdAndRemove(req.params.id);

        res.json(comments);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//get user faults



module.exports = commentRouter;