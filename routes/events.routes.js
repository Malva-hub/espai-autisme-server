const router = require("express").Router();

const Event = require("../models/Event.model");

const isAthenticated = require("../middlewares/isAuthenticated");


const uploader = require("../middlewares/uploader.js");




//POST "/events" => Crear un evento
router.post("/", isAthenticated, uploader.single("image"), async (req, res, next) => {
    const {title, description, address, image, price,} = req.body 
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
            price, 
            image,
            creator: req.payload._id
        })
        res.status(201).json()
    }catch(error){
        next(error)
    }
})


//GET "/events" => Mostrar todos los eventos
router.get("/", async (req, res, next) => {
    try{
        const allEvents = await Event.find().limit(10).populate("attendees", "username")
        res.json(allEvents)
    }catch(error){
        next(error)
    }
})

//GET "/events/:idevent/details" => Buscar un evento
router.get("/:idevent/details", async (req, res, next) => {
    const {idevent} = req.params
    try{
        const oneEvent = await Event.findById(idevent)
        res.json(oneEvent)
    }catch(error){
        next(error)
    }
})

//DELETE "/events/:idevent" => Borrar un evento
router.delete("/:idevent", async(req, res, next) => {
    const {idevent} = req.params
    try{
        await Event.findByIdAndDelete(idevent)
        res.json("se borro correctamente")
    }catch(erro){
        next(error)
    }
})

//PATCH "/events/:idevent" => Editar un evento
router.patch("/:idevent", isAthenticated, async (req, res, next) => {
    const {title, description, address, image, price,} = req.body 
    const {idevent} = req.params
    try{
        await Event.findByIdAndUpdate(idevent, {
            title,
            description,
            address,
            price, 
            image,
            creator: req.payload._id
        })
        res.json("Evento modificado")
    }catch(error){
        next(error)
    }
})

//PATCH "/events/:idevent/attendees" => Añadir un usuario a la lista de attendees
router.patch("/:idEvent/attendees", isAthenticated, async (req, res, next) => {
    const {idEvent} = req.params
    try{
        await Event.findByIdAndUpdate(idEvent, {$addToSet: {attendees: req.payload._id}})
        res.json("Usuario agregado a asistir al evento")
    }catch(error){
        next(error)
    }
})


//GET "/events/attendees" => Mostrar listado de los eventos a los que asistirá un usuario
router.get("/attendees/my-profile", isAthenticated, async (req, res, next) => {
    try{
        const myAttendees = await Event.find({ attendees: {$in : [req.payload._id]  } })
        console.log("ESTO", myAttendees)
        res.json(myAttendees)
    }catch(error){
        next(error)
    }
})







module.exports = router;
