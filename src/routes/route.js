//=================================[ Requirements ]=================================
const express = require("express");
const router = express.Router();
const urlController = require('../controllers/urlController')



//---------------[POST Api]---------------
router.post("/url/shorten", urlController.createUrl)
// ---------------[GET Api]---------------
router.get("/:urlCode", urlController.getUrl)

module.exports = router