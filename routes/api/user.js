var express = require('express');

var router = express.Router();

const UserService = require('../../services/user_service');
const apiRes = require('../../utils/api_response');
const auth = require('../../middlewares/auth');

const HTTPReqParamError = require('../../errors/http_request_param_error');

// 创建新用户
router.post('/', (req, res, next) => {
  (async () => {
    const {username, password, name} = req.body;
    const newUser = await UserService.addNewUser({
      username,
      password,
      name,

    });
    return newUser;
  })()
  .then((r) => {
    res.data = r;
    apiRes(req, res);
  })
  .catch((e) => {
    next(e);
  });
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  (async () => {
    // throw new HTTPReqParamError('page', '请指定页码', 'page is not defined');
    const users = await UserService.getAllUsers();
    return {
      users
    }
  })()
  .then((r) => {
    res.data = r;
    apiRes(req, res);
  })
  .catch((e) => {
    next(e);
  })
});

router.get('/:userId', (req, res) => {
  // console.log(req.params.userId);
  (async () => {
    const { userId } = req.params;
    const user = await UserService.getUserById(userId);
    return {
      user
    }
  })().then(r => {
    res.data = r;
    apiRes(req, res)
  }).catch(e => {
    next(e);
  })
});

router.post('/:userId/subscription', auth(), (req, res) => {
  (async () => {
    const { userId } = req.params;
    const sub = UserService.createSubscription(
      userId,
      req.body.url
    );
    return {
      sub,

    }
  })()
  .then(r => {
    res.data = r;
    apiRes(req, res);
  })
  .catch(e => {
    next(e);
  })

});

module.exports = router;
