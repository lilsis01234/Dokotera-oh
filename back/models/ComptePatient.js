const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComptePatientSchema = new Schema({
    email: String,
    password: String,
    compte:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    },
    Role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role'
    }
})
const ComptePatient = mongoose.model('ComptePatient', ComptePatientSchema)

module.exports = ComptePatient