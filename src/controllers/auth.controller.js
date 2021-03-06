const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, referralService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);

  // Create a referral relationship.
  await referralService.createReferral(user.id);

  // If referral code is passed in the body, confirm and add 1 point.
  if (req.body.referralCode) {
    await referralService.confirmReferral(req.body);
  }

  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).json({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.json({ user, tokens });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.json({ ...tokens });
});

module.exports = {
  register,
  login,
  refreshTokens,
};
