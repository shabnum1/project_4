//=================[Imports]==============
const shortid = require('shortid')
const urlModel = require('../models/urlModel')

// ====================================[ Create Url ]=================================

const createUrl = async (req, res) => {
    try {
    
        const url = req.body.longUrl
        //---------(check url is present)
        let checkUrl = await urlModel.findOne({ longUrl: url })
        if (checkUrl) return res.status(200).send({ status: true, message: 'Url is already shorten', data: 
        {longUrl: checkUrl.longUrl, shortUrl: checkUrl.shortUrl, urlCode: checkUrl.urlCode} })

        //--------(generate short url code)
        const urlCode = shortid.generate()
        shortUrl = `https://localhost:3000/${urlCode}`

        //-------(create response)
        let response = { longUrl: url, shortUrl, urlCode: urlCode }
        const create = await urlModel.create(response)
        //-------(send response)
        return res.status(201).send({ status: true, data: { longUrl: url, shortUrl: shortUrl, urlCode: urlCode } })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ====================================[ GET Url ]=================================

const getUrl = async (req, res) => {
    try {

        let urlCode = req.params.urlCode
        //-------(Check Code is present)
        let checkCode = await urlModel.findOne({urlCode:urlCode})
        if(!checkCode) return res.status(400).send({status: false, message: 'Invalid URL Code or Not Found'})
        //-------(redirect to long url)
        if(checkCode) return res.redirect(302, checkCode.longUrl)

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}




module.exports.createUrl = createUrl
module.exports.getUrl = getUrl
