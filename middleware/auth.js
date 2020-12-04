module.exports = {
    ensureAuth: function (req, res, next) {
        console.log(req.isAuthenticated())
      if (req.isAuthenticated()) {
        return  next();
      } else {
        res.redirect('/')
      }
    },
    ensureGuest: function (req, res, next) {
        console.log(req.isAuthenticated())
        if (!req.isAuthenticated()) {
            return next();
          } else {
            
            res.redirect('/dashboard');
          }
    }
}