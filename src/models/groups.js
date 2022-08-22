const timespan = require("jsonwebtoken/lib/timespan");
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

module.exports = model("Group", GroupSchema);
