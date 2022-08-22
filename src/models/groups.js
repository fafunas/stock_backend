const { Schema, model } = require("mongoose");

const GroupSchema = Schema({
  cod: {
    type: String,
    required: [true, "El Tipo es Obligatorio"],
  },
  description: {
    type: String,
    required: [true, "La descripcion es Obligatoria"],
  },
},{timestamps: true});

GroupSchema.methods.toJSON = function(){
  const {__v,_id, ...group}= this.toObject();
  group.id= _id;
  return group;
}

module.exports = model("Group", GroupSchema);
