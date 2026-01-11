// models/RepairRequest.js
const { Schema, model } = require("mongoose");

const RepairRequestSchema = new Schema({
  customer: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mechanic: { type: Schema.Types.ObjectId, ref: "User" },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "Vehicle",
    required: true,
  },

  problemDescription: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "requested",
      "assigned",
      "en_route",
      "repair_started",
      "completed",
      "canceled",
    ],
    default: "requested",
  },

  location: {
    latitude: Number,
    longitude: Number,
  },

  price: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = model("RepairRequest", RepairRequestSchema);
