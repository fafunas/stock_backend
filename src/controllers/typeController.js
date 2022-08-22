const { response, request } = require("express");

const Type = require('../models/types')

const getType = (req = request, res = response) => {
  const allType = typeServices.getType();
  res.json(allType);
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

    res.json({
        msg:'Type Created',
        type
    })

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const putType = (req = request, res = response) => {
  const updateType = typeServices.putType();
  res.json(updateType);
};

const deleteType = (req = request, res = response) => {
  const deleteType = typeServices.deleteType();
  res.json(deleteType);
};

module.exports = { getType, postType, putType, deleteType };
