const express = require('express');
const router = express.Router();
const RendezVous = require('../models/Rendezvous');
const mongoose = require('mongoose');


// Route pour créer un rendez-vous (Create)
router.post('/rendezvous', async (req, res) => {
    try {
        const { patient, docteur, contenu, date,heureStart } = req.body;

        const newRendezVous = new RendezVous({
            patient,
            docteur,
            contenu,
            date,
            heureStart,
            approbation:0,
        });

        const savedRendezVous = await newRendezVous.save();
        res.status(201).json(savedRendezVous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la création du rendez-vous.' });
    }
});



// Route pour obtenir un rendez-vous par son ID (Read)
router.get('/rendezvous/:id', async (req, res) => {
    try {
        const rendezvous = await RendezVous.findById(req.params.id).populate('docteur',['name']);
        if (!rendezvous) {
            return res.status(404).json({ error: 'Rendez-vous non trouvé.' });
        }
        res.json(rendezvous);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de la récupération du rendez-vous.' });
    }
}); 


//Les rendez-vous d'un docteur particulier

router.get('/rendezvouslist/:idDocteur', async (req, res) => {
  const idDoc = req.params.idDocteur;

  if (!mongoose.Types.ObjectId.isValid(idDoc)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const mesrendezvous = await RendezVous.find({ docteur: idDoc, approbation: 1 })
      .populate('patient') // Populate the "patient" field with patient details
      .exec();

    res.json(mesrendezvous);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous approuvés:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Populate the RendezVous objects with patient details for non-approved appointments
router.get('/rendezvousnonapplist/:idDocteur', async (req, res) => {
  const idDoc = req.params.idDocteur;

  try {
    const mesrendezvous = await RendezVous.find({ docteur: idDoc, approbation: 0 })
      .populate('patient') // Populate the "patient" field with patient details
      .exec();

    res.json(mesrendezvous);
  } catch (error) {
    console.error('Erreur lors de la récupération des rendez-vous approuvés:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});



//Les rendez-vous d'un docteur particulier
router.get('/rendezvousnonapplist/:idDocteur', async (req, res) => {
  const idDoc = req.params.idDocteur
  try {
      const mesrendezvous = await RendezVous.find({ docteur: idDoc, approbation:0 }).exec();
      res.json(mesrendezvous);
    } catch (error) {
      console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
});

//Approbation
router.post('/approbation/:id', async (req, res) => {
  try {
    const rendezVousId = req.params.id;
    const rendezVous = await RendezVous.findById(rendezVousId);
    if (!rendezVous) {
      return res.status(404).json({ error: 'Rendezvous not found' });
    }

    rendezVous.approbation = 1;

    const updatedRendezVous = await rendezVous.save();

    return res.status(200).json(updatedRendezVous);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error updating rendezvous' });
  }
});



    router.get('/rendezvouslistpatient/:idPatient', async (req, res) => {
        const idPatient = req.params.idPatient
        try {
            const mesrendezvous = await RendezVous.find({ patient: idPatient }).exec();
            res.json(mesrendezvous);
          } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous approuvés :', error);
            res.status(500).json({ message: 'Erreur serveur' });
          }
        });


// Route pour mettre à jour un rendez-vous par son ID (Update)
router.put('/rendezvous/:id', async (req, res) => {
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

// router.get('/rendezvous/:user1Id/:user2Id', async (req, res) => {
//     try {
//         const { user1Id, user2Id } = req.params;

//         // Recherchez les rendez-vous entre les deux utilisateurs en utilisant leurs ID
//         const rendezvous = await RendezVous.find({
//             $or: [
//                 { patient: user1Id, docteur: user2Id },
//                 { patient: user2Id, docteur: user1Id }
//             ]
//         }).sort({ date: 1 });

//         res.json(rendezvous);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Erreur lors de la récupération des rendez-vous.' });
//     }
// });

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
