const { response, request } = require("express");

const opOutModel = require("../models/op_out");
const productModel = require("../models/products");

const opOutGet = async (req = request, res = response) => {
  try {
    const [total, opOut] = await Promise.all([
      opOutModel.countDocuments(),
      opOutModel.find()
       .populate({ path: "user", select: "name" })
       .populate({ path: "items.product", select: "description" }),
    ]);

    res.json({
      total,
      opOut,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const opOutPost = async (req = request, res = response) => {
  try {
    const { nro_out, user, items } = req.body;
    if (!nro_out || !items || !user) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    const newOut = await opOutModel.create({
        nro_out,
        items,
        user
    }) ;

    items.forEach(e => {
        productModel.findByIdAndUpdate(e.product,{
            $inc:{stock: -e.quantity}
        },{new:true})
        .then((updatedItem)=>{
            if(!updatedItem){
              console.log('Cannot Update');
            }
            else{
              console.log(updatedItem)
            }
          })
        
    });

    
    res.json({
        msg: "Registry Ok",
        newOut,
      });

  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

module.exports = { opOutGet, opOutPost };
