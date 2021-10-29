exports.createDB = (req,res) => {
    let sql = `CREATE DATABASE ${process.env.DATABASE}`
    db.query(sql, err =>{
        if(err){
            throw err
        }
        res.send('Db créée !')
    })
};

exports.createUserTb = (req, res) => {
    let sql = 'CREATE TABLE user(id INT AUTO_INCREMENT, nom VARCHAR(50), prenom VARCHAR(50), email VARCHAR(200), mot_pass VARCHAR(200), role VARCHAR(5) NOT NULL, PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Table user créée')
    })
};

exports.createPostTb = (req, res) => {
    let sql = 'CREATE TABLE post(postId INT AUTO_INCREMENT, userId INT NOT NULL, contenu LONGTEXT, postDate DATETIME, PRIMARY KEY(postId))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Table post créée')
    })
};

