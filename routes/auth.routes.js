const router = require("express").Router();

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const isAuthenticated = require("../middlewares/isAuthenticated");

// 1.SIG UP

//POST "/api/auth/signup"  => Crear un perfil usuario en la BD
router.post("/signup", async (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    res
      .status(400)
      .json({ errorMessage: "Los campos no se han rellenado correctamente" });
    return;
  }
  // Strong password
  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe contener mínimo una mayúscula, una minúscula, un número, un carácter especial y entre 8 y 64 caracteres",
    });
    return;
  }

  // Email validation
  const emailRegex =
    /^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/;
  if (emailRegex.test(email) === false) {
    res.status(400).json({
      errorMessage: "Por favor, introduzca una dirección de correo válida",
    });
    return;
  }

  try {
    const foundUserEmail = await User.findOne({ email: email });
    if (foundUserEmail !== null) {
      res
        .status(400)
        .json({ errorMessage: "Ya existe un usuario con este email" });
      return;
    }
    const foundUsername = await User.findOne({ username: username });
    if (foundUsername !== null) {
      res
        .status(400)
        .json({ errorMessage: "Ya existe un usuario con este nombre" });
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json();
  } catch (error) {
    next(error);
  }
});

// 2.LOG IN

//POST "/api/auth/login"  => validar las credenciales del usuario
router.post("/login", async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ errorMessage: "Debes rellenar todos los campos" });
    return;
  }

  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser === null) {
      res.status(400).json({ errorMessage: "Usuario no registrado" });
    }

    const isPasswordIsValid = await bcrypt.compare(
      password,
      foundUser.password
    );
    console.log(isPasswordIsValid);
    if (isPasswordIsValid === false) {
      res.status(400).json({ errorMessage: "La contraseña es incorrecta" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role
    }
    const authToken = jwt.sign(
        payload, 
        process.env.TOKEN_SECRET, 
        {algorithm: "HS256", expiresIn: "4h"}
        
    )

    res.json({ authToken: authToken });

  } catch (error) {
    next(error);
  }
});


//3.VERIFY


//GET "api/auth/verify" => verificar que el usuario ya ha sido validado
router.get("/verify", isAuthenticated, ( req, res, next) => {
    res.json(req.payload)
})



module.exports = router;
