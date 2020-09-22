const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = Router();

/** ============================
 *  @route    GET api/auth
 *  @descrip  Get loger in user
 *  @access   Private
 *  ============================ */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json({user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/** ============================
 *  @route    POST api/auth
 *  @descrip  Auth user & get token
 *  @access   Public
 *  ============================  */
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({msg: 'Invalid Credantials'});
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({msg: 'Invalid Credantials'});
    }

    const payload = {
      user: {
        id: user.id
      }
    }
    
    jwt.sign(
      payload, 
      config.get('jwtSecret'), 
      {
        expiresIn: 360000
      },
      (err, token) => {
        if(err) throw err;
        res.status(200).json({token});
      });
  } catch(err) {
    console.error(err.message);
    res.status(500).json({msg: 'Server error'})
  }

});

module.exports = router;