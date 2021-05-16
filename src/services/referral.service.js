const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { generate } = require('randomstring');
const { Referral, User } = require('../models');
const ApiError = require('../utils/ApiError');
const increaseCount = require('../utils/increaseCount');

/**
 * Create a referral
 * @param {Object} userBody
 * @returns {Promise<Referrer>}
 */
const createReferral = async (userId) => {
  const referrer = new Referral({
    referralId: uuidv4(),
    referralCode: generate(5),
    user: userId,
  });
  await referrer.save();

  if (!referrer) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Referral not created');
  }
  return referrer;
};

/**
 * Confirm a referral
 * @param {Object} userBody
 * @returns {Promise<Referrer>}
 */
const confirmReferral = async (userBody) => {
  const { referralCode } = userBody;
  const referrer = await Referral.findOne({ referralCode });
  if (!referrer)
    // throw new ApiError(httpStatus.NOT_FOUND, 'Not referred!'); Bad idea
    return;

  // Add 1 point to the user referral
  const user = await User.findById(referrer.user);
  const number = increaseCount(user.referralCount);
  user.referralCount = number;
  await user.save();

  return { user };
};

module.exports = {
  createReferral,
  confirmReferral,
};
