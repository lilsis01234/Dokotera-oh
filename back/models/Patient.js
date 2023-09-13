const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PatientSchema = new Schema({
    name: String,
    firstname: String,
    contact: String,
    weight: String,
    address: String,
    dateOfBirth: Date,
})

const Patient = mongoose.model('User', PatientSchema)

module.exports = Patient