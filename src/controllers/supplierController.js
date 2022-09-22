const { response, request } = require("express");

const supplierModel = require("../models/supplier");

const supplierPost = async (req = request, res = response) => {
  try {
    const { name, cuit, phone, email } = req.body;
    if (!name || !cuit || !email) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos Obligatorios" },
      });
    }

    const newSupplier = await supplierModel.create({
      name,
      cuit,
      phone,
      email,
    });
    res.json({
      msg: "Supplier Created",
      newSupplier,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const supplierGet = async (req = request, res = response) => {

    try {
        const suppliers = await Promise.all([supplierModel.find().sort({name:1})])
    res.json({
        suppliers
    })
    } catch (error) {
        res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
    
};

module.exports = { supplierGet, supplierPost };
