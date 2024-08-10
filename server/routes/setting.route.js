const express = require('express');
const authCtrl= require('../controller/auth.controller')
const settingsCtrl = require('../controller/setting.controller')

const router = express.Router()

router.route('/settings')
  .get(settingsCtrl.list)
  .post(authCtrl.requireSignin, settingsCtrl.update)

module.exports= router;