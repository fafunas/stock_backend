const { response, request } = require("express");

const productModel = require("../models/products");

const productGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { status: true };

  const [total, productos] = await Promise.all([
    productModel.countDocuments(query), //trae el total de productos True y se almacena en Total
    productModel
      .find(query)
      .skip(Number(desde))
      .limit(Number(limite))
      .populate({ path: "type", select: "cod" })
      .populate({ path: "group", select: "cod" }), // trae x cantidad de productos y se almacena en la variable productos
  ]);

  res.json({
    total,
    productos,
  });
};

const getProductByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    const productStock = [{
      "product" : id,
      "stock" : product.stock
    }]

    return res.json({ ok: true, productStock });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
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

const productPut = async (req = request, res = response) => {
  const { id } = req.params;

  const { cod, group, type, description, stock_min } = req.body;

  const product = await productModel.findByIdAndUpdate(id, {
    cod,
    group,
    type,
    description,
    stock_min,
  });

  res.json(product);
};

//Se actualiza el estado, no se elimina
const productDelete = async (req = request, res = response) => {
  const { id } = req.params;

  const productUpdate = await productModel.findByIdAndUpdate(id, {
    status: false,
  });

  res.json(productUpdate);
};

module.exports = { productGet, productPost, productPut, productDelete, getProductByID };
