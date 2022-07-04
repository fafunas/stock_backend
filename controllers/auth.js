const { response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require("../models/users");
const { genJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    //Check user in db
    if (!user) {
      return res.status(400).json({
        msg: "Usuario incorrecto",
      });
    }

    //Check User Status
    if (!user.status) {
        return res.status(400).json({
          msg: "Usuario incorrecto - False",
        });
      }

    //Check Password
      const validPassword = bcryptjs.compareSync(password, user.password)
    if (!validPassword){
        return res.status(400).json({
            msg:"Usuario incorrecto - pass"
        })
    }

    //JWT
     const token = await genJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal",
    });
  }
};

module.exports = { login };
