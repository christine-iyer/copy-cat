const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['customer', 'mechanic', 'admin'],
      required: true,
    },
    phone: String,
    location: String,

    // Mechanic-specific
    serviceType: { type: String, enum: ['mobile', 'shop', 'both'] },
    shopLocation: {
      address: String,
      latitude: Number,
      longitude: Number,
    },
    skills: [String],
    experienceYears: Number,
    serviceRadiusMiles: Number,
    available: { type: Boolean, default: true },
    serviceVehicles: [
      {
        make: { type: String }, // "Toyota", "Ford", "Etc"
        categories: [String], // "Sedan", "SUV", "Truck"
        fuelTypes: [String], // "Electric", "Diesel", "Gasoline", "Hybrid"
        transmissions: [String], // "Automatic", "Manual"
        driveTypes: [String], // "FWD", "RWD", "AWD", "4WD"
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = model('User', UserSchema);
