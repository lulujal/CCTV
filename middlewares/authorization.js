function authorization(...allowedRoles) {
  return function(req, res, next) {
    const { user } = req;

    if (user) {
      const { role } = user;

      if (!allowedRoles.includes(role)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    }

    next();
  };
}

module.exports = authorization;