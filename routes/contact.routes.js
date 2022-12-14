const router = require("express").Router();

const Contact = require("../models/Contact.model");

//POST "/contact" => crear un contacto
router.post("/", async (req, res, next) => {
  const { username, firstname, secondname, email, telephone } = req.body;
  if (!username || !firstname || !secondname || !email || !telephone) {
    res
      .status(400)
      .json({ errorMessage: "Tienes que rellenar todos los campos" });
    return;
  }
  try {
    await Contact.create({
      username,
      firstname,
      secondname,
      email,
      telephone,
    });
    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

//GET "/contact" => mostrar contactos
router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

//PATCH "/contact/:idcontact" => modificar propiedad isaproved
router.patch("/:idcontact", async (req, res, next) => {
  const { idcontact } = req.params;

  try {
    const oneContact = await Contact.findByIdAndUpdate(idcontact, {
      isaproved: true,
    });
    res.json("Este contacto ahora es un socio ");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
