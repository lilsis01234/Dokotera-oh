require('./config/db')

const app = require('express')()
const port = 3000
const express = require('express');
const cors = require('cors');



const PatientRouter = require('./api/Patient')
const DoctorRouter = require('./api/Doctor')
const AuthRouter = require('./api/auth')
const RoleRouter = require('./api/Roles')
const RendezVous = require('./api/RendezVous')
const ChatRouter = require('./api/Chat')


const bodyParser = require('express').json
app.use(bodyParser())

//permission de cors
app.use(cors({
    origin: 'http://localhost:19006', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
  }));

const PORT = process.env.PORT || 3000;


app.use('/patient', PatientRouter)
app.use('/doctor', DoctorRouter)
app.use('/auth', AuthRouter)
app.use('/role', RoleRouter)
app.use('/rendezvous', RendezVous)
app.use('/chat', ChatRouter)
app.use('/uploads', express.static('uploads'));


app.listen(port, () => {
    console.log(`marche sur le port ${port}`)
})