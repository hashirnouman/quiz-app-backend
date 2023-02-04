const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "sanjose*12";
const saltRounds = 10;

exports.signup = async (req, res) => {
  let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  user
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err }));
};
exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const result = bcrypt.compareSync(req.body.password, user.password);
  if (result === true) {
    const accessToken = jwt.sign(user.toJSON(), secretKey, { expiresIn: "2h" });
    const refreshToken = jwt.sign(user.toJSON(), secretKey, {
      expiresIn: "7d",
    });
    res.status(200).send({
      message: "Successful login",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } else {
    res.status(403).send({ message: "wrong credentials" });
  }
};
