import jwt from "jsonwebtoken";

// VERIFY JWT
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "unauthorized access",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyAdmin = (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "forbidden access",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};
