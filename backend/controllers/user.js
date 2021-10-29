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
        }
        let sql = 'INSERT INTO user SET ?'
        db.query(sql, user, err =>{
        if(err){
            return res.status(500).json({message: 'Un utilisateur utilise déjà cet email'})
        }
            res.status(201).json({ message: 'Inscription réussi' })
        })
    })
    .catch(error => res.status(500).json({ error }));
};

//connexion à un compte existant
exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    }
    const sql = 'SELECT * FROM user WHERE email = ?'
    db.query(sql, user.email, (err, result) => {
        if(result.length === 0){
            return res.status(400).json({message:'Utilisateur non trouvé'})
        }
        bcrypt.compare(req.body.password, result[0].mot_pass)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                data: result[0],
                id: result[0].id,
                token: jwt.sign(
                { id: result[0].id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )})
        })
        .catch(err => res.status(500).json({message:'Connexion échouée'}, err))            
    })
};

//affichage d'un membre
exports.showProfil = (req, res) => {
    const sql = `SELECT id, nom, prenom, email FROM user WHERE id = ${req.params.id}`
    db.query(sql, (err, result) =>{
        if(result.length === 0){
            return res.status(404).json({message:'Utilisateur non trouvé'})
        }
        res.send(result)
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
            if(result === undefined){
               return res.status(400).json({message:'L\'email renseignée est déjà utilisée'})
            }
            else if(result.affectedRows === 0){
                return res.status(500).json({message:'L\'opération demandée est impossible'})
            }
            res.status(200).json({message:'Profile mis à jour'})
        })
    })  
};

//suppression d'un compte
exports.deleteProfil = (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(result.affectedRows === 0){
           return res.status(500).json({message:'Le compte que vous essayez de supprimer n\'existe pas'})
        }
        res.status(200).json({message:'Compte utilisateur supprimé avec succès'})
    })
};

