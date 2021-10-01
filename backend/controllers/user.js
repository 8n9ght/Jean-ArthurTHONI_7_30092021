const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database');

//création d'un compte
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            mot_pass: hash
        };
        let sql = 'INSERT INTO user SET ?'
        db.query(sql, user, err =>{
        if(err){
            res.status(500).json({message: 'Un utilisateur utilise déjà cet email'})
        }
        res.status(201).json({ message: 'Inscription réussi' })
    })
        .catch(error => res.status(500).json({ error }));
    })
    
};


//affichage d'un compte
exports.showProfil = (req, res) => {
    const sql = `SELECT nom, prenom FROM user WHERE id = ${req.params.id}`
    db.query(sql, (err, result) =>{
        console.log(result)
        if(result.length === 0){
            return res.status(404).json({message:'Utilisateur non trouvé'})
        }
        res.status(200).json(result)
    })
};

//modification d'un compte
exports.updateProfil = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        let newNom = req.body.nom
        let newPrenom = req.body.prenom
        let newEmail = req.body.email
        let newPass = hash
        let sql = `UPDATE user SET nom = '${newNom}', prenom = '${newPrenom}', email = '${newEmail}', mot_pass = '${newPass}' WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if(err){
               return res.status(500).json({message:'Modification non réalisée'})
            }
            res.status(200).json({message:'Profile mis à jour'})
        })
    })  
};

//suppression d'un compte
exports.deleteProfil = (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            res.status(500).json({message:'Une erreur est survenue'})
        }
        res.status(200).json({message:'Compte utilisateur supprimé avec succès'})
    })
};

