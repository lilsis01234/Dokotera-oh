const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const CompteDoctor = require('../models/CompteDoctor');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multer = require('multer');
const Rolemodel = require('../models/Role');

// Configurez Multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Le dossier 'uploads/' doit être créé dans votre projet
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, 'photo-' + uniqueSuffix + '.' + extension);
    }
});

const upload = multer({ storage: storage });

// Route d'inscription du docteur avec téléchargement de la photo
router.post('/inscriptionDoctor', upload.single('photo'), async (req, res) => {
    let { name, firstname, contact, speciality, experience, email, password, Role } = req.body;

    if (name == "" || firstname == "" || contact == "" || speciality == "" || experience == "" || email == "" || Role == "" || password == "") {
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
    if (!password || password.trim() === "") {
        res.json({
            status: "FAILED",
            message: "Password is required"
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
            experience,
            photo: req.file.filename // Enregistrez le nom du fichier téléchargé dans la propriété 'photo'
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

        const role = await Rolemodel.findById(savedCompteDoctor.Role);

        // role contiendra RoleTitle et Etat
        if (!role) {
            throw new Error("Role not found"); // Gérez le cas où le rôle n'est pas trouvé
        }

        // Générez un token JWT
        const token = jwt.sign({ userId: savedCompteDoctor._id }, 'yourSecretKey', { expiresIn: '1h' });

        // Envoyez le token, l'ID de l'utilisateur, et d'autres données dans la réponse
        res.status(200).json({
            status: "SUCCESS",
            message: "Inscription réussie",
            token,
            compteId: savedCompteDoctor._id,
            roleid: savedCompteDoctor.Role,
            roleTitle: role.RoleTitle,
            etat: role.Etat,
            userId: compte
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            status: "FAILED",
            message: "Internal server error"
        });
    }
});



router.get('/allDoctor',(req,res)=>{
    Doctor.find({})
    .then((doctors) => {
        res.json(doctors); // Send the JSON response
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    });
})
module.exports = router

