


const isAdmin = (req,res,next) => {
  
    
    if (req.payload.role === "admin") {
            next()
        } else {
            res.status(401).json({errorMessage: "Acceso solo para Admin"})
        }
   
}

module.exports = isAdmin;