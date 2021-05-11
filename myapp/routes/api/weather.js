const express = require('express');
const got = require('got')
const router = express.Router();
const {validationResult, query } = require('express-validator')

require('dotenv').config()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

const validator = (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({error: error.array()})
    }   next()
}

router.get('/', [query('lat').isNumeric(), query('lon').isNumeric()], validator, async (req, res, next) => {
    const { lat, lon } = req.query
    const apiKey = process.env.API_KEY_OW
    try {
        const response = await got('https://api.openweathermap.org/data/2.5/weather',
            {searchParams:{lat,lon,appid: apiKey}},
        )
        //   res.json({message: 'Weather page'});
        res.json(JSON.parse(response.body))
     } catch (err) {
        next(err)
    }
});

// вівод ошибки 500
router.get('/error', function (req, res) {
    throw new Error('Error!')
  res.json({message: 'Error'});
});


module.exports = router;