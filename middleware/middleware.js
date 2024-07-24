const isAuth = async (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

const isAdmin = async (req, res, next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        res.redirect('/#admin');
    }
};

module.exports = {
    isAuth,
    isAdmin,
};