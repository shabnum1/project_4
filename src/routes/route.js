//=================================[ Requirements ]=================================
const express = require("express");
const router = express.Router();
const urlController = require('../controllers/urlController')

router.get("/test", function (req, res) {
    res.send({msg: 'App is working'})
})

module.exports = router