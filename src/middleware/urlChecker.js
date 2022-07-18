const urlExists = require('url-exists');

const urlExistsOrNot = function(req,res,next){
    const url = req.body

    if(Object.keys(url).length===0) return res.status(400).send({ status: false, message: 'please provide data body Should not be empty' })

    if (!url.longUrl) return res.status(400).send({ status: false, message: 'Url is required' })

    urlExists(url.longUrl, function(err, exists) {
        if(exists){
        next()
        }
        else
        return res.status(404).send({status: false, message : "Invalid URL provided please check the URL and try again."})
        });
}

module.exports.urlExistsOrNot = urlExistsOrNot
