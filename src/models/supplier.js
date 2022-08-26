const { Schema, model } = require("mongoose");

const SupplierSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es Obligatorio"],
  },
  cuit: {
    type: String,
    unique: true,
    required: [true, "El CUIT es Obligatorio"],
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "El mail es obligatorio"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "is invalid"],
    index: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
},{timestamps: true});


//Modifico lo que reviso una vez hecha la peticion

SupplierSchema.methods.toJSON = function(){
    const{__v, ...supplier} = this.toObject();
    return supplier
}

module.exports = model('Supplier', SupplierSchema);