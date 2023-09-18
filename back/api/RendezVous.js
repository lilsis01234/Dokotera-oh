const express = require('express');
const router = express.Router();
const RendezVous = require('../models/Rendezvous');

// Route pour créer un rendez-vous (Create)
router.post('/vous', async (req, res) => {
    try {
        const { patient, heureStart, docteur, description, date } = req.body;

        const newRendezVous = new RendezVous({
            patient,
            docteur,
            description,
            heureStart,
            approbation:0
        });

        const savedRendezVous = await newRendezVous.save();
        res.status(201).json(savedRendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du rendez-vous.' });
    }
});

// Route pour obtenir tous les rendez-vous (Read)
router.get('/vous', async (req, res) => {
    try {
        const rendezvous = await RendezVous.find().populate('patient docteur');
        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' });
    }
});

// Route pour obtenir un rendez-vous par son ID (Read)
router.get('/vous/:id', async (req, res) => {
    try {
        const rendezvous = await RendezVous.findById(req.params.id).populate('patient docteur');
        if (!rendezvous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }
        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du rendez-vous.' });
    }
});

router.get('/rendezvous/:idDocteur', async (req, res) => {
    const doc = req.params.idDocteur
    try {
        const mesrendezvous = await RendezVous.find({ docteur: idDocteur, approbation:1 }).exec();
        res.json(mesrendezvous);
      } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
        res.status(500).json({ message: 'Erreur serveur' });
      }
    });

    router.get('/rendezvous/:idPatient', async (req, res) => {
        const doc = req.params.idPatient
        try {
            const mesrendezvous = await RendezVous.find({ patient: idPatient, approbation:1 }).exec();
            res.json(mesrendezvous);
          } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
            res.status(500).json({ message: 'Erreur serveur' });
          }
        });


// Route pour mettre à jour un rendez-vous par son ID (Update)
router.put('/vous/:id', async (req, res) => {
    try {
        const { contenu, date, heureStart } = req.body;

        const updatedRendezVous = await RendezVous.findByIdAndUpdate(
            req.params.id,
            { contenu, date, heureStart },
            { new: true }
        );

        if (!updatedRendezVous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }

        res.json(updatedRendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour du rendez-vous.' });
    }
});

// Route pour supprimer un rendez-vous par son ID (Delete)
router.delete('/desapprendezvous/:id', async (req, res) => {
    try {
        const deletedRendezVous = await RendezVous.findByIdAndRemove(req.params.id);

        if (!deletedRendezVous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }

        res.json({ message: 'Rendez-vous supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la suppression du rendez-vous.' });
    }
});


router.get('/vous/:user1Id/:user2Id', async (req, res) => {
    try {
        const { user1Id, user2Id } = req.params;

        // Recherchez les rendez-vous entre les deux utilisateurs en utilisant leurs ID
        const rendezvous = await RendezVous.find({
            $or: [
                { patient: user1Id, docteur: user2Id },
                { patient: user2Id, docteur: user1Id }
            ]
        }).sort({ date: 1 });

        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' });
    }
});

router.post('/rendezvous/:idrendezvous', async (req, res) => {
    const rendezvousIdToUpdate = req.params.idrendezvous;
  
    try {
      // Find the rendezvous by ID and update the approbation field to 1
      const updatedRendezVous = await RendezVous.findByIdAndUpdate(
        rendezvousIdToUpdate,
        { approbation: 1 },
        { new: true }
      );
  
      if (!updatedRendezVous) {
        return res.status(404).json({ message: 'Rendezvous not found' });
      }
  
      return res.status(200).json(updatedRendezVous);
    } catch (err) {
      console.error('Error updating rendezvous:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
// Dans votre fichier de routes (rendezvousRoutes.js par exemple)
router.get('/rendezvous/approuves', async (req, res) => {
    try {
      const approvedAppointments = await RendezVous.find({ approbation: 1 }).exec();
      res.json(approvedAppointments);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  
  router.get('/rendezvous/demande', async (req, res) => {
    try {
      const approvedAppointments = await RendezVous.find({ approbation: 0 }).exec();
      res.json(approvedAppointments);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
module.exports = router;
