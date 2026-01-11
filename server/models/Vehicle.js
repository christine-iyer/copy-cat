const { Schema, model } = require("mongoose");

const VehicleSchema = new Schema(
  {
    vin: { type: String, required: true, unique: true },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Vehicle", VehicleSchema);
