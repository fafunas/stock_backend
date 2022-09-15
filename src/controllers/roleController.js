const { response, request } = require("express");

const Role = require('../models/role')
const User = require('../models/users')

const getRoles = async(req = request, res = response) => {
  const roles= await Promise.all([Role.find()])

  res.json({
    roles
  })
};

const getRolByUserId = async(req=request, res=response)=>{
  try {
    const {email} = req.body

    const user = await User.findOne({email}).populate({path:"rol",select: "rol"})

    const i = user._id
    const role = user.rol.rol
    

    res.json({
      role,
      i
      
    })
   
    
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
}

const postRole = async (req = request, res = response) => {
  try {
    const { rol } = req.body; //Viene del body

    //Valido que no vengan vacios
    if (!rol) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    //Creo nuevo type
    const NewRol = new Role({rol});
    //Guardo Type en bd

    await NewRol.save();

    res.json({
        NewRol,
        msg: "Rol Created"
    })

    

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};


module.exports = { getRoles, postRole, getRolByUserId};