const { getUser } = require("../service/auth");

async function restrictToLogedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uuid;
  if (!userUid) {
    return res.json({
      massage: "this future is access only when you loged In",
    });
  }

  const user = getUser(userUid);
  if (!user) {
    return res.json({
      massage: "this future is access only when you loged In",
    });
  }

  req.user = user;

  next();
}

module.exports = {
  restrictToLogedInUserOnly,
};