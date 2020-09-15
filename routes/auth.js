const {Router} = require('express');
const router = Router();

/** ============================
 *  @route    GET api/auth
 *  @descrip  Get loger in user
 *  @access   Private
 *  ============================ */
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

/** ============================
 *  @route    POST api/auth
 *  @descrip  Auth user & get token
 *  @access   Public
 *  ============================  */
router.post('/', (req, res) => {
  res.send('Log in user');
});

module.exports = router;