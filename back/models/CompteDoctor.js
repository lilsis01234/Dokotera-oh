const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CompteDoctorSchema = new Schema({
    email: String,
    password: String,
    compte:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    Role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }
})
const CompteDoctor = mongoose.model('CompteDoctor', CompteDoctorSchema)

module.exports = CompteDoctor