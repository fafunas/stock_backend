const { Schema, model, default: mongoose } = require ('mongoose');	


const ProductSchema= Schema({
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group'
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type'
    },
    cod:{
        type: String,
        unique:true
    },
    description:{
        type: String
    },
    stock_min:{
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    },
    stock:{
        type:Number,
    }

},{timestamps: true})


module.exports = model('Product',ProductSchema);