//=================[Imports]==============
const shortid = require('shortid')
const urlModel = require('../models/urlModel')
const redis = require("../cache/redis")


//------------(validUrl) 
const validUrl = (value) => {
    let urlRegex = /^(http(s)?:\/\/)?(www.)?([a-zA-Z0-9])+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/[^\s]*)?$/;
    if (urlRegex.test(value))
        return true;
}

// ====================================[ Create Url ]=================================

const createUrl = async (req, res) => {
    try {

        const body = req.body
        const url = req.body.longUrl
        if (Object.keys(body).length === 0) return res.status(400).send({ status: false, message: 'please provide data ,body Should not be empty' })
        if (!url) return res.status(400).send({ status: false, message: 'Url is required' })
        if (!validUrl(url)) return res.status(400).send({ status: false, message: 'Invalid URL provided please check the URL and try again.' })

        //--------(generate short url code)
        const urlCode = shortid.generate().toLowerCase()
        shortUrl = `http://localhost:3000/${urlCode}`

        //---------(check url is present) 
        let cachedUrlData = await redis.GET_ASYNC(`${req.body.longUrl}`)
        if (cachedUrlData) {
            let checkUrl = JSON.parse(cachedUrlData)
            return res.status(200).send({status: true, message: 'Url is already shorten,found in cache', data: checkUrl})
        }
        let urlDoc = await urlModel.findOne({ longUrl: url }).select({ _id: 0, __v: 0 });
        if (urlDoc) {
            await redis.SETEX_ASYNC(`${req.body.longUrl}`, 60*60*24*2, JSON.stringify(urlDoc))
            return res.status(200).send({ status: true, message: 'Url is already shorten,found in DB', data: urlDoc })
        }

        //-------(create response)
        let response = { longUrl: url, shortUrl, urlCode: urlCode }
        const create = await urlModel.create(response)
        //-------(send response)
        return res.status(201).send({ status: true, data: response })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ====================================[ GET Url ]=================================

const getUrl = async (req, res) => {
    try {
        let urlCode = req.params.urlCode
        let checkUrlInCache = await redis.GET_ASYNC(`${urlCode}`)
        if (checkUrlInCache) {
            let con = JSON.parse(checkUrlInCache)
            res.redirect(302, con.longUrl)
        } else {
            let urlDoc = await urlModel.findOne({ urlCode: urlCode });
            if (!urlDoc) return res.status(404).send({ status: false, message: 'Invalid URL Code or Not Found' })
            await redis.SETEX_ASYNC(`${urlCode}`, 60*60*24*2 , JSON.stringify(urlDoc))
            return res.redirect(302, urlDoc.longUrl)
        }

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

module.exports.createUrl = createUrl
module.exports.getUrl = getUrl
