const { Op } = require("sequelize");
const { verifyToken } = require("../lib/jwt")
const moment = require("moment")
const { User, Session } = require("../lib/sequelize");


const authorizedLoggedInUser = (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log(token)

    const verifiedToken = verifyToken(token)
    req.token = verifiedToken

    console.log(req.token)
    next()
  } catch (err) {
    console.log(err)
    if (err.message === "jwt expired") {
      return res.status(419).json({
        message: "token expired"
      })
    }

    return res.status(401).json({
      message: err.message
    })
  }
}

const authorizedLoggedInUser2 = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log(token)

    const verifiedToken = await Session.findOne({ 
      include : 
      [ User ]
      ,
        where : {
          token : token,
          is_valid : true,
          valid_until : {
            [Op.gt] : moment().utc(),
          }
        }
      
      })
      

      console.log("this " + verifiedToken)
      if(!verifiedToken){
        throw new Error("expired")
      }


    req.token = verifiedToken

    next()
  } catch (err) {
    console.log(err)
    if (err.message === " expired") {
      return res.status(419).json({   
        message: "token expired"
      })
    }

    return res.status(401).json({
      message: err.message
    })
  }
}

module.exports = { authorizedLoggedInUser, authorizedLoggedInUser2 }