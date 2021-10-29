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
    res.status(201).json({message: 'Publication créée'})
    })
}

exports.displayFeed = (req, res) => {
    let sql = `SELECT id, nom, prenom, contenu, role, postId, postDate FROM ${process.env.DATABASE}.post INNER JOIN ${process.env.DATABASE}.user ON post.userId = user.id ORDER BY postId DESC`
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

/* exports.likeManagement = (req, res, next) => {
    switch (req.body.like) {
      case 0: 
        Sauce.findOne({ _id: req.params.id }) 
          .then((sauce) => {
            if (sauce.usersLiked.find(user => user === req.body.userId)) {  
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: -1 },           
                $pull: { usersLiked: req.body.userId },     
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'Like pris en compte' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
  
            } if (sauce.usersDisliked.find(user => user === req.body.userId)) {     
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: req.body.userId }, 
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: 'Dislike pris en compte!' }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
          })
          .catch((error) => { res.status(404).json({ error: error }); });
        break;
  
      case 1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Like pris en compte!' }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
  
      case -1:
        Sauce.updateOne({ _id: req.params.id }, {
          $inc: { dislikes: +1 },
          $push: { usersDisliked: req.body.userId },
          _id: req.params.id
        })
          .then(() => { res.status(201).json({ message: 'Dislike pris en compte!' }); })
          .catch((error) => { res.status(400).json({ error: error }); });
        break;
  
      default:
        console.error('Requête incorrecte');
    }
  }; */
