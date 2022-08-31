const {Schema, model, default: mongoose} = require ('mongoose');


const OpOutSchema = Schema({
    nro_out:{
        type: Number,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    items:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: Number,
            },
            observation:{
                type: String
            }
        }
    ]
},{timestamps:true});

module.exports = model("OpOut", OpOutSchema);