const router = require("express").Router();

const Event = require("../models/Event.model");

const isAthenticated = require("../middlewares/isAuthenticated");


//POST "/events" => Crear un evento
router.post("/", isAthenticated, async (req, res, next) => {
    const {title, description, address, image, price,} = req.body 
    //todo Pregunta: Como esto lo rellena el admin hace falta que lo compruebe
    if (!title || !description || !address || !price) {
        res
          .status(400)
          .json({ errorMessage: "Tienes que rellenar todos los campos" });
        return;
      }
    try{ 
        await Event.create({
            title,
            description,
            address,
            //image, //TODO CLOUDINARY :)
            price, 
            creator: req.payload._id
        })
        res.status(201).json()
    }catch(error){
        next(error)
    }
})



//GET "/events" => Mostrar los eventos 












module.exports = router;
