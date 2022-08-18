const router = require("express").Router();

const User = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

//GET "/user/myprofile" => ver perfil de usuario
router.get("/myprofile", isAuthenticated, async (req, res, next) => {
  try {
    const profileUser = await User.findById(req.payload._id);
    console.log(profileUser);
    res.json(profileUser);
  } catch (error) {
    next(error);
  }
});

//PATCH "/user/myprofile" => editar perfil
router.patch("/myprofile", isAuthenticated, async (req, res, next) => {
  const { username, email } = req.body;
  console.log(req.body);
  try {
    await User.findByIdAndUpdate(req.payload._id, {
      username,
      email,
    });
    res.json("probando ruta");
  } catch (error) {
    next(error);
  }
});

//DELETE "/user/myprofile" => borrar perfil
router.delete("/myprofile", isAuthenticated, async(req, res, next) =>{
    try{
        await User.findByIdAndDelete(req.payload._id)
        res.json("se borro correctamente el usuario")
    }catch(error){
        next(error)
    }
})

module.exports = router;
