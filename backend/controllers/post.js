app.get('/user', (req, res) => {
    let sql = 'SELECT * FROM user'
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Détails des utilisateurs')
    })
})

//affichage d'un compte
app.get('/user/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) =>{
        if(err){
            throw err
        }
        console.log(result)
        res.send('Détails de l\'utilisateur')
    })
})

//modification d'un compte
app.get('/profile_update/:id', (req, res) => {
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
})

//suppression d'un compte
app.get('/profile_delete/:id', (req, res) => {
    let sql = `DELETE FROM user WHERE id = ${req.params.id}`
    let query = db.query(sql, (err, result) => {
        if(err){
            throw err
        }
        console.log(result)
        res.send('Compte supprimé')
    })
})