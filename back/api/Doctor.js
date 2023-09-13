const express = require('express')
const router = express.Router()

const Doctor = require('../models/Doctor')

const CompteDoctor = require('../models/CompteDoctor')

//inscription
const bcrypt = require('bcrypt');
const saltRounds = 10; // Adjust the number of salt rounds as needed

router.post('/inscriptionDoctor', async (req, res) => {
    let { name, firstname, contact, speciality, experience, email, password, Role } = req.body;

    if (name == "" || firstname == "" || contact == "" || speciality == "" || experience == "") {
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        });
        return;
    }

    if (!/^[a-zA-Z]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newDoctor = new Doctor({
            name,
            firstname,
            contact,
            speciality,
            experience
        });

        const savedDoctor = await newDoctor.save();
        const compte = savedDoctor.id;

        const newCompteDoctor = new CompteDoctor({
            email,
            password: hashedPassword,
            compte,
            Role
        });

        const savedCompteDoctor = await newCompteDoctor.save();

        res.json({
            status: "SUCCESS",
            message: "Inscription réussie",
            date: savedCompteDoctor, // You can change this to `savedCompteDoctor` if needed
        });
    } catch (err) {
        res.json(err);
    }
});


//profil du docteur
router.get('/doctor/:id',(req,res)=>{
    const id = req.params.id;
    Doctor.findById(id)
})
module.exports = router

