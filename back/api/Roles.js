const express = require('express')
const router = express.Router()
const Role = require('../models/Role')

router.post('/addRole',(req,res)=>{
    let {Etat,RoleTitle}= req.body;
    Etat = Etat.trim()
    RoleTitle = RoleTitle.trim()

    if(Etat == "" || RoleTitle == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    }
    else{
        const newRole = new Role({
            Etat,
            RoleTitle
        })

        newRole.save().then(result => {
            res.json({
            status: "SUCCESS",
            message: "role ajouté",
            date: result,
            })
        })
        .catch(err => {
        res.json(err)
        })
    }
})


router.get('/getRole',(req,res)=>{
    Role.find({})
    .then((role) => {
        res.json(role); // Send the JSON response
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
    });
})
module.exports = router