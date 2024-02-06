const express = require("express");
const conservationRouter = express.Router();
const auth = require("../middlewares/auth");
const Conservation = require("../models/conservation");


//get User
conservationRouter.post("/api/conservation", async (req, res) => {
    try {
        const { conservation } = req.body;
        let conservations = new conservation({ conservation });
        conservations = await conservation.save();
        res.json(conservations);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
conservationRouter.get("/api/conservation/:id", async (req, res) => {
    try {
        const id = req.params.id
        console.log(id);
        const conservations = await Conservation.find({ id: id });
        res.json(conservations);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
conservationRouter.delete("/api/conservation/:id", auth, async (req, res) => {
    try {
        const id = req.params.id

        console.log("iddddd", id);
        const conservation = await Conservation.findByIdAndRemove(req.params.id);

        res.json(conservation);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

//get user faults



module.exports = conservationRouter;