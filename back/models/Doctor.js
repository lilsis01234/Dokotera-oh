const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DoctorSchema = new Schema({
    name: String,
    firstName: String,
    speciality: String,
    contact: String,
    experience: String,
})

const Doctor = mongoose.model('Doctor', DoctorSchema)

module.exports = Doctor