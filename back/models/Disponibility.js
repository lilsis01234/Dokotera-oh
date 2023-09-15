const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DisponibilitySchema = new Schema({
    docteur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    heureStart : String,
    heureEnd : String,
    date: Date
})

const Disponibility = mongoose.model('Disponibility', DisponibilitySchema)

module.exports = Disponibility