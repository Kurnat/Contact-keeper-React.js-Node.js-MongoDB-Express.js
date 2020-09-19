const {Router} = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Contact = require('../models/Contact');

const router = Router();

/** ============================
 *  @route    GET api/contacts
 *  @descrip  Get all contacts
 *  @access   Private
 *  ============================ */
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});

    res.json({contacts})
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

/** ============================
 *  @route    POST api/contacts
 *  @descrip  Add new contact
 *  @access   Private
 *  ============================  */
router.post('/', [
    auth, [
      check('name', 'Name is required')
      .not()
      .isEmpty()
    ]
  ], 
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const {name, email, phone, type} = req.body;
    try {
      const newContact = new Contact({name, email, phone, type, user: req.user.id});
      const constact = await newContact.save();

      res.status(201).json({constact});
    } catch (err) {
      console.error(err)
      res.status(500),send('Server Error')
    }
});

/** ============================
 *  @route    PUT api/contacts
 *  @descrip  Update contact
 *  @access   Private
 *  ============================  */
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

/** ============================
 *  @route    DELETE api/contacts
 *  @descrip  Delete contact
 *  @access   Private
 *  ============================  */
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;