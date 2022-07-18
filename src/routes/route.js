//=================================[ Requirements ]=================================
const express = require("express");
const router = express.Router();
const urlController = require('../controllers/urlController')
const midi = require('../middleware/urlChecker')


router.get("/test", function (req, res) {
    res.send({msg: 'App is working'})
})

//---------------[POST Api]---------------
router.post("/url/shorten",midi.urlExistsOrNot, urlController.createUrl)
// ---------------[GET Api]---------------
router.get("/:urlCode", urlController.getUrl)

module.exports = router