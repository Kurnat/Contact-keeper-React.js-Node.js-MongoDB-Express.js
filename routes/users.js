const {Router} = require('express');

const router = Router();

/** ============================
 *  @route    POST api/users
 *  @descrip  Register a user
 *  @access   Public
 *  ============================  */
router.post('/', (req, res) => {
  res.send('Register a user');
});

module.exports = router;