const express = require('express');
const router = express.Router();
const Chat = require('../models/Chats');
const multer = require('multer');
const path = require('path');

// Configurez Multer pour spécifier où stocker les fichiers téléchargés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Le dossier 'uploads/' doit être créé dans votre projet
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split('.').pop();
        cb(null, 'pieceJointe-' + uniqueSuffix + '.' + extension);
    }
});

const upload = multer({ storage: storage });

// Route pour créer un chat (Create)
router.post('/chat', upload.array('pieceJointes', 5), async (req, res) => {
    try {
        const { patient, docteur, contenu, date } = req.body;
        // const pieceJointes = [];

        // Ajoutez les informations sur les fichiers joints téléchargés
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


router.get('/chats/:user1Id/:user2Id', async (req, res) => {
    try {
        const { user1Id, user2Id } = req.params;

        // Recherchez les messages entre les deux utilisateurs en utilisant leurs ID
        const chats = await Chat.find({
            $or: [
                { patient: user1Id, docteur: user2Id },
                { patient: user2Id, docteur: user1Id }
            ]
        }).sort({ date: 1 });

        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
    }
});

// Route pour obtenir tous les chats triés par date (Read)
router.get('/chats', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ date: 1 }).populate('patient docteur');
        res.json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des chats.' });
    }
});

// Route pour supprimer un chat par son ID (Delete)
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
