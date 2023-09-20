const express = require('express');
const router = express.Router();
const Chat = require('../models/Chats');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');


router.get('/messagesDoctor/:idDocteur', async (req, res) => {
  try {
    const idDocteur = req.params.idDocteur;

    const messages = await Chat.find({ docteur: idDocteur })
    .populate('patient',['name','firstName'])

    if (!messages) {
      return res.status(404).json({ message: 'No messages found for this doctor.' });
    }

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get('/messagesPatient/:idPatient', async (req, res) => {
    try {
      const idPatient = req.params.idPatient;
  
      const messages = await Chat.find({ patient: idPatient })
      .populate('doctor',['name','firstName']);
  
      if (!messages) {
        return res.status(404).json({ message: 'No messages found for this doctor.' });
      }
  
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });


  router.get('/nosmessages/:idDocteur/:idPatient', async (req, res) => {
    try {
      const idDocteur = req.params.idDocteur;
      const idPatient = req.params.idPatient;
  
      const messages = await Chat.find({
        docteur: idDocteur,
        patient: idPatient
      }).populate('docteur',['name','firstName'])
      .populate('patient',['name','firstName'])
  
      if (!messages) {
        return res.status(404).json({ message: 'No messages found for this doctor and patient.' });
      }
  
      res.json(messages);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// Configuration Multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, 'pieceJointe-' + uniqueSuffix + '.' + extension);
    }
});

const upload = multer({ storage: storage });

// Route pour créer un chat
router.post('/chat', upload.array('pieceJointes', 5), async (req, res) => {
    try {
        const { patient, docteur, contenu, date } = req.body;
        const pieceJointes = [];

        // informations sur les fichiers joints téléchargés
        req.files.forEach((file) => {
            pieceJointes.push({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path
            });
        });

        const newChat = new Chat({
            patient,
            docteur,
            contenu,
            date,
            pieceJointes
        });

        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du chat.' });
    }
});


// Route pour supprimer un chat par son ID 
router.delete('/chat/:id', async (req, res) => {
    try {
        const deletedChat = await Chat.findByIdAndRemove(req.params.id);

        if (!deletedChat) {
            return res.status(404).json({ error: 'Chat non trouvé.' });
        }

        res.json({ message: 'Chat supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du chat.' });
    }
});


module.exports = router;
