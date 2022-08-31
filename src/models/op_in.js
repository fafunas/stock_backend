const { Schema, model, default: mongoose } = require("mongoose");


const OpInSchema = Schema({
  nro_in: {
    type: Number,
    unique: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
        quantity: {
        type: Number,
      },
      nro_rq: {
        type: Number,
      },
      observation: {
        type: String,
      },
    },
  ],
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
  },
  date: {
    type: Date,
  },
},{timestamps: true});

module.exports = model("OpIn", OpInSchema);
