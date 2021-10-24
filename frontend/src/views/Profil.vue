<template>
    <div class="container">
        <div class="page__title">
            <h1 class="title">Mon espace Groupomania</h1>
        </div>

        <div class="form">
            <h2 class="sub_title">Mes informations</h2>

            <p class="user__infos">{{user.nom}}</p>
            <p class="user__infos">{{user.prenom}}</p>
            <p class="user__infos">{{user.email}}</p>

            <form action="">
                <h2 class="sub_title">Modifier mon profil</h2>
                <div class="input">
                    <input v-model="nom" type="text" name="nom" id="lname" placeholder="Entrez votre nom">
                </div>

                <div class="input">
                    <input v-model="prenom" type="text" name="prenom" id="fname" placeholder="Entrez votre prenom">
                </div>

                <div class="input">
                    <input v-model="email" type="email" name="email" id="mail" placeholder="Entrez votre email">
                </div>

                <div class="input">
                    <input v-model="password" type="password" name="password" id="pass" placeholder="Entrez votre mot de passe">
                </div>
                
                <span class="forgot" v-if="status == 'error_signup'">
                    <p class="error_login">Adresse email déjà utilisée</p>
                </span>
            </form>

            <button class="button--ok" @click="upDate()">Mettre à jour mes informations</button>
            <button class="logout__button" @click="logOut()">Déconnexion</button>
            <button class="delete__button" @click="deleteAccount()">Supprimer mon compte</button>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'
const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:8080/user'
});

export default {
    name: 'Profil',
    mounted: function(){
        if(this.data.id == -1 || this.data.id == undefined){
            this.$router.push('/');
            return;
        }else{
            this.$router.push('/user/profile/' + this.$store.state.user.data.id);
        }
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'userInfos',
        })  
    },
    methods: {
        logOut: function(){
            this.$store.dispatch('logOut')
            this.$router.push('/home');
        },
        upDate: function(){
            this.$store.dispatch('upDate', {
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                password: this.password,
            })
            .then(function(){
                this.$router.push('/user/profile/' + this.$store.state.user.data.id);
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deleteAccount: function(){
            this.$router.push('/');
            instance.delete('/profile_delete/' + this.$store.state.user.data.id)
        },
    }
    
}
</script>

<style scoped>
*:focus{
    outline: none;
}

.container{
    background: #091F44;
    height: 52.7rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.page__title{
    margin: 5rem 0 2rem;
}

.title{
    color: rgb(255, 255, 255);
    line-height: 30pt;
}

.sub_title{
    margin: .5rem 0 0;
    color: #091F44;
}

.user__infos{
    text-transform: uppercase;
    margin: .25rem 0;
    font-size: 14pt;
}

.forgot{
    display: block;
    margin: 2rem 0 0;
}

.forgot__content{
    font-size: 9pt;
}

.form{
    background: rgb(255, 255, 255);
    padding: 2rem 0;
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
}

form{
    width: 100%;
}

.form input{
    display: block;
}

.input{
    margin: .5rem 0 0 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.input:first-child{
    margin: .5rem 0 0;
}

.input input{
    border: none;
    margin: 1rem 0 0 0;
    height: 2rem;
    width: 15rem;
    background: rgb(240, 240, 240);
    border-radius: .5rem;
    padding: 0 0 0 .8rem;
    color: #091F44;
}

.button--ok{
    color: #fff;
    border: none;
    background: #091F44;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: 1rem 0 .5rem;
    transition: all ease-in-out 200ms
}

.button--ok:hover, .logout__button:hover{
    transform: scale(1.1);
}

.logout__button{
    color: white;
    border: none;
    background: #091F44;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: .5rem 0;
    transition: all ease-in-out 200ms
}

.delete__button{
    color: white;
    border: none;
    background: #AEAEB0;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: .5rem 0;
    transition: all ease-in-out 200ms
}

.delete__button:hover, .logout__button:hover{
    background: #D1515A;
}

.button--ok:hover, .logout__button:hover, .delete__button:hover{
    cursor: pointer;
}


</style>