const express = require("express");
const userRouter = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");


//get User
userRouter.get("/api/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
userRouter.get("/api/users/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const users = await User.find({ id: id });
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
userRouter.delete("/api/users/:id",auth, async (req, res) => {
    try {
        const id = req.params.id

        console.log("iddddd", id);
        const userss = await User.findByIdAndRemove(req.params.id);

        res.json(userss);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
userRouter.patch("/api/users/:id",auth, async (req, res) => {
    try {
        const id = req.params.id

        console.log("iddddd", id);
        const users = await User.findById(req.params.id);

        if (req.body.name!=null) {
            users.name = req.body.name
        }
        if (req.body.surname!=null) {
            users.surname = req.body.surname
        }
        if (req.body.age!=null) {
            users.age = req.body.age
        }
        users.save();
        console.log("ageeee", users.age);
        //console.log("usersss", users);
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
//get user faults



module.exports = userRouter;