const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    docteur:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    },
    contenu : String,
    pieceJointes: [
        {
            originalname: String,
            filename: String,
            path: String
        }
    ],
    date: Date
})

const Chat = mongoose.model('Chats', ChatSchema)

module.exports = Chat