const fs = require('fs');
const db = require('../database');
const multer = require('multer');
const upload = multer({dest: './images'})

exports.createPost = (req, res) => {
    const post = {
        userId: req.params.id,
        contenu: req.body.contenu,
    }
    let sql = 'INSERT INTO post SET ?'
    db.query(sql, post, err =>{
    if(err){
        return res.status(500).json({message: 'Votre publication n\'a pas été publié'})
    }
        res.status(201).json({ message: 'Publication créée'})
    })
}

exports.displayFeed = (req, res) => {
    let sql = 'SELECT postId, contenu FROM post ORDER BY postID DESC'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.send(result)
    })
}

exports.deletePost = (req, res) => {
    let sql = 'DELETE FROM post WHERE postId = ?'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.status(200).json({message: 'Post supprimé'})
    })
}

