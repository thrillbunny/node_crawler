const express = require('express');
const UserService = require('../../services/user_service');
const apiRes = require('../../utils/api_response');

const router = express.Router();
const userRouter = require('./user');

router.use('/user', userRouter);

router.post('/login', (req, res) => {
  (async () => {
    const { username, password } = req.body;
    const result = await UserService.loginWithNamePass(username, password);
    return result;
  })()
  .then((r) => {
    res.data = r;
    apiRes(req, res);
  })
  .catch((e) => {
    next(e);
  });
});

module.exports = router;
