const express = require('express');
// import adminCtrl from '../controllers/admin.controller'
const authCtrl =require( '../controller/auth.controller')


const router = express.Router()

router.route('/api/admin')
  .get(authCtrl.requireSignin)

  module.exports = router;