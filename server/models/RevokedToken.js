const { Schema, model } = require('mongoose');

const RevokedTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Delete document as soon as time in expiresAt is reached
RevokedTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = model('RevokedToken', RevokedTokenSchema);
