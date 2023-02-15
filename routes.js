const express = require("express");
const route = express.Router();
const quizeController = require("./controllers/quizController");
const userController = require("./controllers/userController");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const accessToken = req.headers.authorization.split(" ")[1];
      jwt.verify(accessToken, process.env.TOKEN);
      next();
    } catch (e) {
      res.status(403).send("Error");
    }
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
