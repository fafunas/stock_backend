const { response, request } = require("express");

const Type = require('../models/types')

const getTypes = async(req = request, res = response) => {
  const types= await Promise.all([Type.find().sort({cod:1})])

  res.json({
      types
  })
};

const postType = async (req = request, res = response) => {
  try {
    const { cod, description } = req.body; //Viene del body

    //Valido que no vengan vacios
    if (!description || !cod) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    //Creo nuevo type
    const type = new Type({cod, description});
    //Guardo Type en bd

    await type.save();

    

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const putType = (req = request, res = response) => {

};

const deleteType = (req = request, res = response) => {
 
};

module.exports = { getTypes, postType};
