const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../model/User");

exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password, role, contact, location, sales } = req.body;

  // const user = await User.create({
  //   name,
  //   email,
  //   password,
  //   role,
  //   contact,
  //   location,
  //   sales,
  // });
  const user = await User.create(req.body);
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //if inputs are empty
  if (!email || !password) {
    return next(new ErrorResponse("Provide email and password", 400));
  }

  //Check for User
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid Email", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Password", 401));
  }
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token, user });
});

exports.users = asyncHandler(async (req, res, next) => {
 
  const user = await User.find({ role: "salesman" });

  res.status(200).json({ success: true, user });
});
