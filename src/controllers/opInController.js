const { response, request } = require("express");

const opInModel = require("../models/op_in.js");
const productModel = require ("../models/products.js")

const opInPost = async (req = request, res = response) => {
  try {
    const { nro_in, items, nro_rq, observation, user, supplier, date } =
      req.body;

    if (!nro_in || !items || !user) {
      res.status(400).send({
        status: "Failure",
        data: { error: "Faltan campos obligatorios" },
      });
    }

    const newIn = await opInModel.create({
      nro_in,
      items,
      nro_rq,
      observation,
      user,
      supplier,
      date,
    });


    items.forEach(e => {
       productModel.findByIdAndUpdate(e.product,{
        $inc:{stock: e.quantity}
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
      newIn,
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};


const opInGet =async (req=request, res=response)=>{
    const [total,opIn] = await Promise.all([
        opInModel.countDocuments(),
        opInModel.find()
        .populate({path:'user', select:'name'})
        .populate({path:'supplier',select:'name'})
        .populate({path:'items.product',select:'description'})

    ]);

    res.json({
        total,
        opIn
    })

}

module.exports = {opInPost,opInGet};
