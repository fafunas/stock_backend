const {response, request} = require('express');

const opLeaseModel = require('../models/op_lease');
const productModel = require ("../models/products.js")


const opLeasePost = async (req=request, res=response)=>{
    try {
        const{ nro_lease, product, quantity, observation, user, return_date}= req.body;

        if (!nro_lease || !product || !user|| !quantity) {
            res.status(400).send({
              status: "Failure",
              data: { error: "Faltan campos obligatorios" },
            });
          };

          const newLease = await opLeaseModel.create({
            nro_lease, product,quantity,observation,user,return_date
          });

          productModel.findByIdAndUpdate(product,{
            $inc:{stock: -quantity}
          },{new:true})
          .then((updatedItem)=>{
            if(!updatedItem){
                console.log("Cannot Update");
            }
            else{
                console.log(updatedItem)
            }
          })

          res.json({
            msg:"Op Creado",
            newLease
          })

    } catch (error) {
        res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
}

const opLeaseGet = async (req=request, res=response)=>{
    try {
        const [total, opLease] = await Promise.all([
            opLeaseModel.countDocuments(),
            opLeaseModel.find()
            .populate({path:'user', select:'name'})
            .populate({path:'product', select:'description'})
        ]);

        res.json({
            total,
            opLease
        })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
}


module.exports = {opLeaseGet,opLeasePost}