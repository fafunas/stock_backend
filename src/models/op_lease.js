const { Schema, model, default: mongoose } = require("mongoose");

const OpLeaseSchema = Schema(
  {
    nro_lease: {
      type: Number,
      unique: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
    },
    observation: {
      type: String,
    },
    date: {
      type: Date,
    },
    return_date: {
      type: Date,
    },
    status: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


module.exports=model("OpLease", OpLeaseSchema);