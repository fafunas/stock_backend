const { response, request } = require("express");

const Group = require("../models/groups");

const getGroup = async (req = request, res = response) => {
  const group = await Promise.all([Group.find()]);

  res.json({
    group,
  });
};

const postGroup = async (req = request, res = response) => {
  try {
    const { cod, description } = req.body;

    if (!cod || !description) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    const group = await Group.create({ cod, description });
    res.json({
        msg:'Group Created',
        group
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

// const putGroup = async (req = request, res = response) => {};

// const deleteGroup = async (req = request, res = response) => {};

module.exports = { getGroup, postGroup };
