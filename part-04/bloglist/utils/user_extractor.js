const jwt = require("jsonwebtoken")
const User = require("../models/user")
const config = require("../utils/config")

const userExtractor = async (req, _, next) => {
  const authorization = req.get("authorization")

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7)

    const decodedToken = jwt.verify(token, config.SECRET)
    if (decodedToken.id) {
      req.user = await User.findById(decodedToken.id)
    }
  } else {
    req.user = null
  }

  next()
}

module.exports = userExtractor
