const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const ComptePatient = require('../models/ComptePatient');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Rolemodel = require('../models/Role');
const multer = require('multer');

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

// Route d'inscription du patient avec téléchargement de la photo
router.post('/inscriptionPatient', upload.single('photo'), async (req, res) => {
    let { name, firstname, contact, dateOfBirth, weight, address, email, password, Role } = req.body;

    if (name == "" || firstname == "" || contact == "" || dateOfBirth == "" || weight == "" || address == "" || email == "" || password == "") {
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

        const newPatient = new Patient({
            name,
            firstname,
            contact,
            weight,
            address,
            dateOfBirth,
            photo: req.file.filename // Enregistrez le nom du fichier téléchargé dans la propriété 'photo'
        });

        const savedPatient = await newPatient.save();

        const compte = savedPatient.id;

        const newComptePatient = new ComptePatient({
            email,
            password: hashedPassword,
            compte,
            Role
        });

        const savedComptePatient = await newComptePatient.save();

        const role = await Rolemodel.findById(savedComptePatient.Role);

        // role contiendra RoleTitle et Etat
        if (!role) {
            throw new Error("Role not found"); // Gérez le cas où le rôle n'est pas trouvé
        }

        // Générez un token JWT
        const token = jwt.sign({ userId: savedComptePatient._id }, 'yourSecretKey', { expiresIn: '1h' });

        // Envoyez le token, l'ID de l'utilisateur, et d'autres données dans la réponse
        res.status(200).json({
            status: "SUCCESS",
            message: "Inscription réussie",
            token,
            compteId: savedComptePatient._id,
            roleid: savedComptePatient.Role,
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
 
 
 
 
 

router.get('/allPatient', (req, res) => {
    Patient.find({})
        .then((patients) => {
            res.status(200).json(patients); // Send the JSON response with patients
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
        });
});

module.exports = router;
