const Quiz = require("../models/Quizes");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Empty" });
    return;
  }
  const quiz = new Quiz({
    title: req.body.title,
    options: req.body.options,
  });
  quiz
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(400).send(err));
};
exports.getQuestions = async (req, res) => {
  const questions = await Quiz.find();
  res.send(questions);
};
exports.checkAnswer = async (req, res) => {
  const trueAnswers = await Quiz.findOne({
    _id: req.body._id,
  });
  if (trueAnswers.options) {
    let matchedOption;
    trueAnswers.options.map((option) => {
      if (option._id == req.body.optionid) {
        matchedOption = option;
      }
    });
    if (matchedOption) {
      res.send(matchedOption.isTrue);
    } else {
      res.send("no valid option found in option array");
    }
  }
};
