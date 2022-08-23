const router = require("express").Router();

const Comment = require("../models/Comment.model");

const Event = require("../models/Event.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

//POST "/comment/:idevent" => crear un nuevo comentario
router.post("/:idevent", isAuthenticated, async (req, res, next) => {
  const { idevent } = req.params;
  const { content } = req.body;

    if (!content) {
        res
        .status(400)
        .json({ errorMessage: "Tienes que rellenar el campo del comentario" });
        return;
    } 
    try {
      await Event.findById(idevent);
      await Comment.create({
        event: idevent,
        creator: req.payload._id,
        content,
      });
      res.json("se creo el comentario en el evento");
    } catch (error) {
      next(error);
    }
  
});

//GET "/comment/:idevent" => mostrar comentarios de un evento
router.get("/:idevent", async (req, res, next) => {
  const { idevent } = req.params;

  try {
    const commentEvent = await Comment.find({ event: idevent });

    res.json(commentEvent);
  } catch (error) {
    next(error);
  }
});

//DELETE "/comment/:idcomment" => borrar un comentario
router.delete("/:idcomment", isAuthenticated, async (req, res, next) => {
  const { idcomment } = req.params;

  try {
    const commentCreator = await Comment.findById(idcomment).populate("creator");
    console.log(commentCreator.creator._id)
    console.log(req.payload._id)
    if (req.payload._id == commentCreator.creator._id) {

      await Comment.findByIdAndDelete(idcomment);
      res.json("se borro correctamente el usuario");

    } else {
      res.json({
        errorMessage:
          "No puedes borrar el comentario si no eres el propietario",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
