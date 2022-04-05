const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');

const logger = (req, res, next) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl},`;
  const dateObject = new Date();
  const currentDate = dateObject.toISOString();
  console.log("Logging Route:,", fullUrl, currentDate);
  next();
};

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.AUTH0_IDENTITY,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

module.exports = {
  logger,
  checkJwt
}