const express = require("express");
const route = express.Router();
const quizeController = require("./controllers/quizController");
const userController = require("./controllers/userController");
const jwt = require("jsonwebtoken");
const secretKey = "sanjose*12";
const authenticate = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  try {
    jwt.verify(accessToken, secretKey);
    next();
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
};
route.get("/", (req, res) => {
  res.send("hello");
});

route.post("/create-quiz", authenticate, quizeController.create);
route.post("/signup", userController.signup);
route.put("/login", userController.login);
route.put("/check-answers", authenticate, quizeController.checkAnswer);
route.get("/get-questions", authenticate, quizeController.getQuestions);
module.exports = route;
