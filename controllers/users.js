const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/users");

const usersGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { status: true };

  const [total, usuarios] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usersPost = async (req, res = response) => {
  try {
    const { name, surname, email, password, rol, dni } = req.body; //Esto debe venir del body
    const user = new User({ name, surname, email, password, rol, dni });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.json({
      msg: "User Created",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;

  //Excluimos lo que no quiero modificar y mandamos el resto
  const { _id, password, email, ...resto } = req.body;

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - usuariosPatch",
  });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;


  const user = await User.findByIdAndUpdate(id, { status: false });

  res.json(user);
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
