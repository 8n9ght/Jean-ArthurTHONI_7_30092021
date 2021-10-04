const fs = require('fs');
const db = require('../database');

exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.contenu);
    const post = {
        userId: req.params.id,
        ...postObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
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
    let sql = 'SELECT contenu, image FROM post'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Tous les derniers posts')
    })
}

