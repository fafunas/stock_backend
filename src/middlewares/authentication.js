const jwt = require("jsonwebtoken");
const User = require('../models/users.js')
const Role = require('../models/role')
const { response, request } = require("express");



const verifyToken = (req = request, res = response, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  jwt.verify(token, process.env.SECREYKEY , (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.user.uid;
    next();
  });
};
const isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
   
    Role.find(
      {
        _id: { $in: user.rol },
      },
      (err, rol) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < rol.length; i++) {
          if (rol[i].rol === "ADMIN_ROLE") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Admin Role!" });
       // console.log("vamosss", rol)

        return;
      }
    );
  });
};
const isUser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    Role.find(
      {
        _id: { $in: user.roles },
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].rol === "USER_ROL") {
            next();
            return;
          }
        }
        res.status(403).send({ message: "Require Moderator Role!" });
        return;
      }
    );
  });
};

module.exports = { verifyToken, isAdmin, isUser };
