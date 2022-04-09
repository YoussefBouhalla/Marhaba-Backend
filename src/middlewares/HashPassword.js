const bcrypt = require('bcryptjs')

const hashPassword = (req, res, next) => {
    bcrypt.hash(req.value.password, 10).then((hashedPass) => {
        req.value = {...req.value , password: hashedPass};
        next();
    });
}

module.exports = hashPassword