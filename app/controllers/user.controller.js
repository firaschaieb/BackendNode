exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Assure Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Assurance Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("SOS Content.");
};
