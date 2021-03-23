const express = require('express')
const Country = require('../models/Country')

const router = express.Router()

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.status(200).json(countries)
    })

    // TO DO: FINISH ADDING STATUS CODES TO THE REST OF THIS PAGE. SEE ROUTES/TOTO.JS
    // I DON'T UNDERSTAND THIS SYNTAX VS. THE EXAMPLE IN WEEK 2: DAY 1: MY COOL APP
    .catch(err => next(err))
})

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country,
      })
    })
    .catch(err => next(err))
})

module.exports = router
