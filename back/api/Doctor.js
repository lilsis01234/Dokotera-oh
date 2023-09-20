const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const CompteDoctor = require("../models/CompteDoctor");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const multer = require("multer");
const Rolemodel = require("../models/Role");
const fs = require("fs"); // Node.js File System module
const path = require("path");
const mongoose = require("mongoose");

// Configuration de Multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Le dossier 'uploads/' doit être créé dans votre projet
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, "photo-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB limit (adjust as needed)
  },
});

// Route d'inscription du docteur avec téléchargement de la photo
router.post("/inscriptionDoctor", upload.single("photo"), async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request File:", req.file);
  let {
    name,
    firstname,
    contact,
    speciality,
    experience,
    email,
    password,
    Role,
  } = req.body;

  if (
    name == "" ||
    firstname == "" ||
    contact == "" ||
    speciality == "" ||
    experience == "" ||
    email == "" ||
    Role == "" ||
    password == ""
  ) {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
    return;
  }

  if (!/^[a-zA-Z]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
    return;
  }
  if (!password || password.trim() === "") {
    res.json({
      status: "FAILED",
      message: "Password is required",
    });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDoctor = new Doctor({
      name,
      firstName: firstname,
      contact,
      speciality,
      experience,
      photo: req.file.filename, // Enregistrez le nom du fichier téléchargé dans la propriété 'photo'
    });

    const savedDoctor = await newDoctor.save();

    const compte = savedDoctor.id;

    const newCompteDoctor = new CompteDoctor({
      email,
      password: hashedPassword,
      compte,
      Role,
    });

    const savedCompteDoctor = await newCompteDoctor.save();

    const role = await Rolemodel.findById(savedCompteDoctor.Role);

    // role contiendra RoleTitle et Etat
    if (!role) {
      throw new Error("Role not found"); // Gérez le cas où le rôle n'est pas trouvé
    }

    // Générez un token JWT
    const token = jwt.sign({ userId: savedCompteDoctor._id }, "yourSecretKey", {
      expiresIn: "1h",
    });

    // Envoyez le token, l'ID de l'utilisateur, et d'autres données dans la réponse
    res.status(200).json({
      status: "SUCCESS",
      message: "Inscription réussie",
      token,
      compteId: savedCompteDoctor._id,
      roleid: savedCompteDoctor.Role,
      roleTitle: role.RoleTitle,
      etat: role.Etat,
      userId: compte,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "FAILED",
      message: "Internal server error",
    });
  }
});

router.get("/allDoctor", (req, res) => {
  Doctor.find({})
    .then((doctors) => {
      res.json(doctors); // Send the JSON response
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération des données." });
    });
});

router.get("/profil/:id", async (req, res) => {
  const id = req.params.id;

  // Check if the ID is in a valid ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    // Check if it's a doctor's ID
    const doctor = await Doctor.findById(id);

    if (doctor) {
      // If the ID belongs to a doctor, return the doctor's information
      return res.json(doctor);
    }

    // If it's not a doctor's ID, check if it's a patient's ID
    const patient = await Patient.findById(id);

    if (patient) {
      // If the ID belongs to a patient, return the patient's information
      return res.json(patient);
    }

    // If the ID doesn't belong to either a doctor or a patient, return a 404 response
    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
