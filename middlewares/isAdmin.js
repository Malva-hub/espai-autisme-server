const User = require("../models/User.model")


const isAdmin = async (req,res,next) => {
  
    const userRole = await User.findById(req.payload._id)
    try {
        if (userRole.role == "admin") {
            next()
        } else {
            res.status(401).json({errorMessage: "Acceso solo para Admin"})
        }
    } catch (error) {
        next(error)
    }
}
module.exports = isAdmin;