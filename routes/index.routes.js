const router = require("express").Router();

//GET "/api"
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const contactRoutes = require("./contact.routes")
router.use("/contact", contactRoutes)

const eventsRoutes = require("./events.routes")
router.use("/events", eventsRoutes)

const commentRoutes = require("./comment.routes")
router.use("/comment", commentRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router;
