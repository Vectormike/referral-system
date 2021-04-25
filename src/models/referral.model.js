const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema(
  {
    referralId: {
      type: String,
      required: true,
    },
    referralLink: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
