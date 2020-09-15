const {Router} = require('express');
const router = Router();

/** ============================
 *  @route    GET api/contacts
 *  @descrip  Get all contacts
 *  @access   Private
 *  ============================ */
router.get('/', (req, res) => {
  res.send('Get all contacts');
});

/** ============================
 *  @route    POST api/contacts
 *  @descrip  Add new contact
 *  @access   Private
 *  ============================  */
router.post('/', (req, res) => {
  res.send('Create new contact');
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