
const express = require('express')
const router = express.Router()

const Doctor = require('../models/Doctor')
const CompteDoctor = require('../models/CompteDoctor')
// const Role2 = require('../models/Role2')

const bcrypt = require('bcrypt')
const ComptePatient = require('../models/ComptePatient')
router.post('/loginDoctor',(req,res)=>{
   const compte =  CompteDoctor.findOne({email:req.body.email})
    .populate('Role2',['id','titreRole'])
    .exec((err,compte)=>{
        if(err){
            return res.status(401).json({message:'tsisy e'})
        }
        bcrypt.compare(req.body.password,compte.password,(err,valid)=>{
            if(err){
                return res.status(500).json({err:err})
            }
            if(!valid){
                return res.status(401).json({error:'mdp incorrect'})
            }
        })
        const role = compte.role2.RoleTitle

        const token = jwt.sign({id:compte.id,role:role},secretkey,{
            expiresIn:'1h',
        });

        res.cookie ('token',token,{httpOnly:true,secure:true,maxAge:86400000});

        res.status(200).json({id:compte.id, role:role, token:token});

    });

});


router.post('/loginPatient',(req,res)=>{
    const compte =  ComptePatient.findOne({email:req.body.email})
     .populate('Role2',['id','titreRole'])
     .exec((err,compte)=>{
         if(err){
             return res.status(401).json({message:'tsisy e'})
         }
         bcrypt.compare(req.body.password,compte.password,(err,valid)=>{
             if(err){
                 return res.status(500).json({err:err})
             }
             if(!valid){
                 return res.status(401).json({error:'mdp incorrect'})
             }
         })
         const role = compte.role2.RoleTitle
         const etat = compte.role2.Etat

 
         const token = jwt.sign({id:compte.id,role:role},secretkey,{
             expiresIn:'1h',
         });
 
         res.cookie ('token',token,{httpOnly:true,secure:true,maxAge:86400000});
 
         res.status(200).json({id:compte.id, role:role, token:token, etat:etat});
 
     });
 
 });

 module.exports = router