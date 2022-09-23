const { response, request } = require("express");

const productModel = require("../models/products");
const opInModel = require("../models/op_in");
const opOutModel = require("../models/op_out");
const opLeaseModel = require("../models/op_lease");

const productGet = async (req = request, res = response) => {
  const { limite = 10, desde = 0 } = req.query;
  const query = { status: true };

  const [total, productos] = await Promise.all([
    productModel.countDocuments(query), //trae el total de productos True y se almacena en Total
    productModel
      .find(query)
      .skip(Number(desde))
      .sort({ description: 1 })
      // .limit(Number(limite))
      .populate({ path: "type", select: "cod" })
      .populate({ path: "group", select: "cod" }), // trae x cantidad de productos y se almacena en la variable productos
  ]);

  res.json({
    total,
    productos,
  });
};

//Devuelve la cantidad de prodcutos que esten por debajo del minimo e iguales
const productLimitCount = async (req = request, res = response) => {
  let pipeline = [];
  const project = {
    $project: {
      description: 1,
      stock: 1,
      stock_min: 1,
      lessthan: { $lt: ["$stock", "$stock_min"] },
    },
  };
  const match = { $match: { lessthan: true } };
  const count = { $count: "lessthan" };
  pipeline.push(project);
  pipeline.push(match);
  pipeline.push(count);
  const lessTotal = await productModel.aggregate(pipeline);

  let pipeline2 = [];
  const project2 = {
    $project: {
      description: 1,
      stock: 1,
      stock_min: 1,
      equalTo: { $eq: ["$stock", "$stock_min"] },
    },
  };
  const match2 = { $match: { equalTo: true } };
  const count2 = { $count: "equalTo" };
  pipeline2.push(project2);
  pipeline2.push(match2);
  pipeline2.push(count2);
  const equalTo = await productModel.aggregate(pipeline2);

  let pipeline3 = [];
  const project3 = {
    $project: {
      description: 1,
      stock: 1,
      stock_min: 1,
      greater: { $gt: ["$stock", "$stock_min"] },
    },
  };
  const match3 = { $match: { greater: true } };
  const count3 = { $count: "greater" };
  pipeline3.push(project3);
  pipeline3.push(match3);
  pipeline3.push(count3);
  const greater = await productModel.aggregate(pipeline3);

  res.json({
    lessTotal,
    equalTo,
    greater,
  });
};

const getProductslessStock = async (req = request, res = response) => {
  try {
    let pipeline = [];
    const project = {
      $project: {
        description: 1,
        stock: 1,
        stock_min: 1,
        lessthan: { $lt: ["$stock", "$stock_min"] },
      },
    };
    const match = { $match: { lessthan: true } };
    pipeline.push(project);
    pipeline.push(match);
    const lessthan = await productModel.aggregate(pipeline);

    res.json({
      lessthan,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const getProductsSameStock = async (req = request, res = response) => {
  try {
    let pipeline = [];
    const project = {
      $project: {
        description: 1,
        stock: 1,
        stock_min: 1,
        samethan: { $eq: ["$stock", "$stock_min"] },
      },
    };
    const match = { $match: { samethan: true } };
    pipeline.push(project);
    pipeline.push(match);
    const same = await productModel.aggregate(pipeline);

    res.json({
      same,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const getProductsMoreStock = async (req = request, res = response) => {
  try {
    let pipeline = [];
    const project = {
      $project: {
        description: 1,
        stock: 1,
        stock_min: 1,
        greaterthan: { $gt: ["$stock", "$stock_min"] },
      },
    };
    const match = { $match: { greaterthan: true } };
    pipeline.push(project);
    pipeline.push(match);
    const greater = await productModel.aggregate(pipeline);

    res.json({
      greater,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const getProductByID = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);

    const productStock = [
      {
        product: id,
        stock: product.stock,
      },
    ];

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

const totalMovements = async (req = request, res = response) => {
  try {
    const totalIn = await Promise.all([opInModel.countDocuments()]);

    const totalOut = await Promise.all([opOutModel.countDocuments()]);

    const totalLease = await Promise.all([opLeaseModel.countDocuments()]);

    res.json({
      totalIn,
      totalOut,
      totalLease
    })
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

module.exports = {
  productGet,
  productPost,
  productPut,
  productDelete,
  getProductByID,
  productLimitCount,
  getProductslessStock,
  getProductsSameStock,
  getProductsMoreStock,
  totalMovements
};
