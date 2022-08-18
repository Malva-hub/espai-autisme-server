const router = require("express").Router();

const Comment = require("../models/Comment.model");

const Event = require("../models/Event.model");

const isAuthenticated = require("../middlewares/isAuthenticated");


//POST "/comment/:idevent" => crear un nuevo comentario
router.post("/:idevent",  isAuthenticated, async (req, res, next) => {
    const {idevent} = req.params
    const {content} = req.body
    try{    
        await Event.findById(idevent)
        await Comment.create({
            event:idevent,
            creator: req.payload._id,
            content
        })
        res.json("se creo el comentario en el evento")

    }catch(error){
        next(error)
    }
    
})




module.exports = router;