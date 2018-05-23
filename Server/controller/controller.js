module.exports = {
  getScore: (req, res, next) => {
    const db = req.app.get("db");

    db
      .read_score()
      .then(score => res.status(200).send(score))
      .catch(() => res.status(500).send);
  },
  createScore: (req, res, next) => {
    const db = req.app.get("db");
    const { name, score } = req.body;
    db
      .create_score([name, score])
      .then(() => res.status(200).send())
      .catch(() => res.status(500).send());
  }
};
