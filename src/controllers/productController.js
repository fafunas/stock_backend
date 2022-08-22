const { response, request } = require("express");

const productModel = require("../models/products");

const productGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { status: true };

  const [total, productos] = await Promise.all([
    productModel.countDocuments(query), //trae el total de productos True y se almacena en Total
    productModel.find(query).skip(Number(desde)).limit(Number(limite)), // trae x cantidad de productos y se almacena en la variable productos
  ]);

  res.json({
    total,
    productos,
  });
};

const productPost = async (req = request, res = response) => {
  try {
    const { group, type, cod, description, stock_min } = req.body;

    if (!group || !type || !cod || !stock_min || !description) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    const newProduct = await productModel.create({
      group,
      type,
      cod,
      description,
      stock_min,
    });

    res.json({
      msg: "Product Created",
      newProduct,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

module.exports = { productGet, productPost };
