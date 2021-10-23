const fs = require('fs');
const db = require('../database');
const multer = require('multer');
const upload = multer({dest: './images'})

exports.createPost = (req, res) => {
    const userId = req.params.id;
    const contenu = req.body.contenu;
    db.query('INSERT INTO post (userId, contenu, postDate) VALUES (?, ?, NOW());', [userId, contenu], (err, result) =>{
    if(err){
        res.status(500).json({message: 'Votre publication n\'a pas été publié'})
    }
    res.status(201).json({ message: 'Publication créée'})
    })
}

exports.displayFeed = (req, res) => {
    let sql = 'SELECT postId, contenu, postDate FROM post ORDER BY postID DESC'
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

