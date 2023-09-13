const express = require('express')
const router = express.Router()

const Patient = require('../models/Patient')

const bcrypt = require('bcrypt')
const ComptePatient = require('../models/ComptePatient')


//inscription
router.post('/inscriptionPatient', (req, res) => {
    let {name, firstname, contact,address,weight, dateOfBirth,email,password,role2} = req.body
    name = name.trim()
    firstname = firstname.trim()
    contact = contact.trim()
    address = address.trim()
    weight = weight.trim()
    dateOfBirth = dateOfBirth.trim()
    email = email.trim()
    password = password.trim()
    role2 = role2.trim()


    if (name == "" || firstname == "" || contact == "" || weight == "" || address == "" || dateOfBirth == "" || email== "" || password == "" || role2 == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    } else {
            const newPatient = new Patient({
            name,
            firstname,
            contact,
            weight,
            address,
            dateOfBirth
            })

            newPatient.save().then(result => {
                res.json({
                status: "SUCCESS",
                message: "Inscription reussi",
                date: result,
                })
            })
            .catch(err => {
            res.json(err)
            })
//Ajout de compte
            const newPatientAccount = new ComptePatient({
            email,
            password,
            role2
            }) 
            newPatientAccount.save().then(result => {
            res.json({
                status: "SUCCESS",
                message: "Inscription reussi",
                date: result,
            })
            })
            .catch(err => {
                res.json(err)
            })

            }
        })


//profil du patient
module.exports = router