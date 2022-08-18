const router = require("express").Router();

//GET "/api"
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

module.exports = router;
