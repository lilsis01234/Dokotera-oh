
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');

const Doctor = require('../models/Doctor')
const CompteDoctor = require('../models/CompteDoctor')
// const Role2 = require('../models/Role2')


const bcrypt = require('bcrypt')
const ComptePatient = require('../models/ComptePatient')

router.post('/loginDoctor', async (req, res) => {
    try {
        const compte = await CompteDoctor.findOne({ email: req.body.email })
            .populate('Role', ['id', 'RoleTitle', 'Etat'])
            .populate('compte', 'id');

        if (!compte) {
            return res.status(401).json({ message: 'Compte non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.password, compte.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const role = compte.Role.RoleTitle;
        const etat = compte.Role.Etat;
        const doctorId = compte.compte.id; // Get the doctor's ID

        const token = jwt.sign({ id: compte.id, role: role, doctorId: doctorId }, 'secretkey', {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 86400000 });

        res.status(200).json({ id: compte.id, role: role, token: token, etat: etat, Id: doctorId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
});



router.post('/loginPatient', async (req, res) => {
    try {
        const compte = await ComptePatient.findOne({ email: req.body.email })
            .populate('Role', ['id', 'RoleTitle'])
            .populate('compte', 'id');

        if (!compte) {
            return res.status(401).json({ message: 'Compte non trouvé' });
        }

        const validPassword = await bcrypt.compare(req.body.password, compte.password);

        if (!validPassword) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        const role = compte.Role.RoleTitle;
        const etat = compte.Role.Etat;
        const patientId = compte.compte.id; // Get the patient's ID

        const token = jwt.sign({ id: compte.id, role: role, patientId: patientId }, 'secretkey', {
            expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 86400000 });

        res.status(200).json({ id: compte.id, role: role, token: token, etat: etat, Id: patientId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
});

 module.exports = router