const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/middleware').isAuth;
const isAdmin = require('../middleware/middleware').isAdmin;
const controller = require('../controllers/controller');

router.get('/', controller.index);

router.get('/home', isAuth, controller.home);

router.get('/login', controller.get_login);

router.post('/login', controller.post_login);

router.get('/signup', controller.get_signup);

router.post('/signup', controller.post_signup);

router.get('/logout', isAuth, controller.logout);

router.get('/messages/:id', isAuth, controller.get_message);

router.get('/become-member', isAuth, controller.become_member_get);

router.post('/become-member', isAuth, controller.become_member_post);

router.get('/become-admin', isAuth, controller.become_admin_get);

router.post('/become-admin', isAuth, controller.become_admin_post);

router.get('/create-message', isAuth, controller.create_message_get);

router.post('/create-message', isAuth, controller.create_message_post);

router.get('/messages/:id/delete', isAdmin, controller.delete);

module.exports = router;
