const httpStatus = require('http-status');
const { v4: uuidv4 } = require('uuid');
const { User, Referral } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a referral
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createReferral = async (referralBody) => {
  const referrer = new Referral({
    referralId: uuidv4(),
    referralLink: uuidv4(),
    user: referralBody.user_id,
  });
  if (!referrer) {
    throw new ApiError(httpStatus.NOT_IMPLEMENTED, 'Referral not created');
  }
  return referrer;
};

module.exports = {
  createReferral,
};
