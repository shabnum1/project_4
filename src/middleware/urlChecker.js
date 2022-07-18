const urlExists = require('url-exists');

const urlExistsOrNot = function(req,res,next){
    const url = req.body.longUrl
    urlExists(url, function(err, exists) {
        if(exists){
        next()
        }
        else
        return res.status(404).send({status: false, message : "Not a valid Url"})
        });
}

module.exports.urlExistsOrNot = urlExistsOrNot
