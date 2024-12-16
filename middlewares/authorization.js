function authorization(...allowedRoles) {
  return function(req, res, next) {
    const { user } = req;

    if (user) {
      const { role } = user;

      if (!allowedRoles.includes(role)) {
        console.log('Unauthorized role:', role);
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } else {
      console.log('No user in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    next();
  };
}

module.exports = authorization;