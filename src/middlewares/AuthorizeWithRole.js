const authorizeWithRole = (...roles) => {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            res.status(401).json({ error: "you are not authorized" });
        } else {
            next()
        }  
    }

}

module.exports = authorizeWithRole