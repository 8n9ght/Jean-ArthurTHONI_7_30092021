const fs = require('fs');
const db = require('../database');
const multer = require('multer');
const upload = multer({dest: './images'})

exports.createPost = (req, res) => {
    const contenu = req.body.contenu;
    const userId = req.body.id;
    db.query('INSERT INTO post (userId, contenu, postDate) VALUES (?, ?, NOW());', [userId, contenu], (err, result) =>{
    if(err){
        res.status(500).json({message: 'Votre publication n\'a pas été publié'})
    }
    res.status(201).json({ message: 'Publication créée'})
    })
}

exports.displayFeed = (req, res) => {
    /* SELECT nom, prenom, contenu, postDate FROM groupomania.post INNER JOIN groupomania.user ON post.userId = user.id ORDER BY postId DESC */
    let sql = 'SELECT nom, prenom, contenu, postDate FROM groupomania.post INNER JOIN groupomania.user ON post.userId = user.id ORDER BY postId DESC'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.send(result)
    })
}

exports.deletePost = (req, res) => {
    let sql = `DELETE FROM post WHERE postId = ${req.params.postId}` 
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.status(200).json({message: 'Post supprimé'})
    })
}

