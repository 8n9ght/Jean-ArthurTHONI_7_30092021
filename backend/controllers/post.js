const fs = require('fs');
const db = require('../database');

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
    let sql = `SELECT id, nom, prenom, contenu, role, postId, postDate, likes FROM ${process.env.DATABASE}.post INNER JOIN ${process.env.DATABASE}.user ON post.userId = user.id ORDER BY postId DESC`
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        res.send(result)
    })
}

exports.deletePost = (req, res) => {
    let sql = `SELECT role, id FROM ${process.env.DATABASE}.user`
    let query = db.query(sql, (err, result) =>{
      if(result[0].role !== 'admin'){
        res.status(401).json({message: 'Vous n\'avez pas les droits pour faire ça'})
      }
      else{
        let sql2 = `DELETE FROM post WHERE postId = ${req.params.postId}` 
        let query2 = db.query(sql2, (err, result) =>{
          if(err){
              throw err
          }
          res.status(200).json({message: 'Post supprimé'})
        })
      }
    })
}

exports.like = (req, res) => {
  const userLiked = req.body.userLiked;
  const postId = req.body.postId;
  db.query('INSERT INTO likes (userLiked, postId) VALUES (?, ?);', [userLiked, postId], (err, result) =>{
    if(err){
        res.status(500).json({message: 'Votre publication n\'a pas été publié'})
    }
    db.query('UPDATE post SET likes = likes + 1 WHERE postId = ?', postId, (err2, result2) => {
      res.send(result)
    })
  })
};
