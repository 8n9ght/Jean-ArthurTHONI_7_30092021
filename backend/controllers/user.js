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
        let query = db.query(sql, user, err =>{
        if(err){
            throw err
        }
        res.send('Inscription réussi')
    })
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    
};


/* //affichage d'un compte
exports.showProfil = (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Détails de l\'utilisateur')
    })
};

//modification d'un compte
exports.updateProfil = (req, res) => {
    let newNom = 'Nom mis à jour'
    let newPrenom = 'Prénom mis à jour'
    let newEmail = 'Email mis à jour'
    let newPass = 'Mot de passe mis à jour'
    let sql = `UPDATE user SET nom = '${newNom}', prenom = '${newPrenom}', email = '${newEmail}', mot_pass = '${newPass}'`;
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Profile mis à jour')
    })
};

//suppression d'un compte
exports.deleteProfil = (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Compte supprimé')
    })
};
 */
