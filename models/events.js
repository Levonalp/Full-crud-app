const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  date: String,
  street: String,
  sqft: String,
  yearBuilt: String,
  img: String,
  price: String,
  details:String
})

const eventCollection = mongoose.model('Event', eventSchema)

module.exports = eventCollection

