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

const getAll = async (req=request, res= response)=>{
    try {
        const allLease = await Promise.all([
            opLeaseModel.find()
            .populate({path:'user', select:'name'})
            .populate({path:'product', select:'description'})
        ]);

        res.json({
            allLease
        })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
}

const opLeaseGet = async (req=request, res=response)=>{
    try {
        const query = {status: false}
        const [total, opLease] = await Promise.all([
            opLeaseModel.countDocuments(),
            opLeaseModel.find(query)
            .sort({date_return:1})
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

//Ponemos el estado en true para indicar que se consumio el articulo
const disableLease = async ( req=request, res= response)=>{
    const {id} = req.params;
    try {
        const leaseUpdate= await opLeaseModel.findByIdAndUpdate(id,{
            status:true
        })


        res.json({
            msg: 'Registry Ok',
            leaseUpdate
        })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }
}

//Ponemos el estado del lease en TRUE y actualizamos el Stock de lo que se devolvio
const returnLease= async(req=request, res= response)=>{
    const {id} = req.params
    const {quantity, productID} = req.body
    
    
    try {
        const productUpdate = productModel.findByIdAndUpdate(productID,{
            $inc:{stock:quantity}
        },{new:true})
        .then((updatedItem=>{
            if(!updatedItem){
                console.log('Cannot Update');
              }
              else{
                console.log(updatedItem)
              }
        }))
        const leaseUpdate= await opLeaseModel.findByIdAndUpdate(id,{
            status:true
        })

        res.json({
            msg: 'Registry Ok',
            leaseUpdate,
            productUpdate
        })
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILDED", data: { error: error?.message || error } });
    }

}
//Aca al recibir el ID del lease recibo todo....

module.exports = {opLeaseGet,opLeasePost,getAll,disableLease,returnLease}