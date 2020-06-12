const jwt = require('jwt-simple');
const moment = require('moment');

exports.checkToken = (req, res, next) => {
  if(!req.headers['access-token']) {
    return res.status(403).json({ error: 'Error please include header access-token' });
  }

  const token = req.headers['access-token'];
  let payload = null;
  try {
    payload = jwt.decode(token, process.env.SECRET_KEY);
  } catch (err) {
      return res.status(403).json({ error: 'access-Token is not valid'})
  }
  if (payload.expiredAt < moment().unix()) {
    return res.status(403).json({ error: 'access-token has expired'})
  }

  if (payload.usuario !== 'Marcos') {
    return res.status(403).json({ error: 'The user is not valid'})
  }

  req.payload = payload;

  next();
}