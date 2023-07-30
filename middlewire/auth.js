const { secretKey, userRole, companyRole } = require("../constants");
const jwt = require("jsonwebtoken");

const verifyIsAuthorized = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);

    const role = decoded.role;

    if (role !== userRole && role !== companyRole) {
      return res.status(403).json({ error: "You are not authorized" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const verifyUserRole = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);

    const role = decoded.role;

    if (role !== userRole) {
      return res
        .status(403)
        .json({ error: "You are not authorized as a user" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const verifyCompanyRole = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);

    const role = decoded.role;

    if (role !== companyRole) {
      return res
        .status(403)
        .json({ error: "You are not authorized as a company" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

const isAccessAllowed = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);

    const tokenId = decoded.id;
    const id = parseInt(req.params.id);

    if (tokenId !== id) {
      return res.status(403).json({ error: "Access is denied" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  verifyUserRole,
  verifyCompanyRole,
  isAccessAllowed,
  verifyIsAuthorized,
};
