const { Schema, model } = require("mongoose");

const TypeSchema = Schema({
  cod: {
    type: String,
    required: [true, "El Tipo es Obligatorio"],
  },
  description:{
      type: String,
      required: [true, "La descripcion es Obligatoria"],
  }

},{timestamps: true});

TypeSchema.methods.toJSON = function(){
  const {__v,_id, ...type}= this.toObject();
  type.id= _id;
  return type;
}

module.exports = model("Type", TypeSchema);
