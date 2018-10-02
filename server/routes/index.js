const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Server Page is Working !");
  return res.status(500).json({"message":"Server Page is Working !"});
});

module.exports = router;
