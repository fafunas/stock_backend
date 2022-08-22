const { Schema, model, default: mongoose } = require ('mongoose');	


const ProductSchema= Schema({
    group:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    type:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
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
        default: 0
    }

},{timestamps: true})


module.exports = model('Product',ProductSchema);