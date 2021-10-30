<template>
    <div class="container">
        <div class="page__title">
            <h1 class="title">Mon espace Groupomania</h1>
        </div>

        <div class="form">
            <h2 class="sub_title">Mes informations</h2>

            <p class="user__infos">{{userData.nom}}</p>
            <p class="user__infos">{{userData.prenom}}</p>
            <p class="user__infos">{{userData.email}}</p>

            <form action="">
                <h2 class="sub_title">Modifier mon profil</h2>
                <div class="input">
                    <input v-model="nom" type="text" name="nom" id="lname" placeholder="Entrez votre nom" >
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

                <button class="button--ok" @click="upDate()">Mettre à jour mes informations</button>
            </form>
 
            <button class="delete__button" @click="openModal()">Supprimer mon compte</button>
        </div>
        <div class="confirmDelete-bg">
            <div class="confirmDelete">
                <p class="confirmDelete-text">Voulez-vous vraiment supprimer votre compte ?</p>
                <div class="confirmDelete-buttons">
                    <button class="nodelete__button" @click="closeModal()">Non, revenir en sécurité</button>
                    <button class="delete__button" @click="deleteAccount()">Oui, Supprimer mon compte</button>
                </div>
        </div>
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
        const userData = JSON.parse(sessionStorage.getItem('user'));
        const token = userData.token;
        if(token == ''){
            this.$router.push('/');
        }
        else{
            this.$router.push('/user/profile/' + userData.data.id);
        }
        this.$store.dispatch('getUserInfos');
    },
    computed: {
        ...mapState({
            user: 'user',
            userData: 'userData',
        })  
    },
    methods: {
        upDate: function(){
            this.$store.dispatch('upDate', {
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                password: this.password,
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deleteAccount: function(){
            const userData = JSON.parse(sessionStorage.getItem('user'));
            const config = {
                    headers: {
                        Authorization: userData.token,
                    }
                }
            this.$router.push('/');
            instance.delete('/profile_delete/' + this.$store.state.user.data.id, config)
        },
        confirmDeletion: function(){

        },
        openModal: function(){
            const modal = document.querySelector(".confirmDelete-bg");
            modal.style.display = "block";
        },
        closeModal: function(){
            const modal = document.querySelector(".confirmDelete-bg");
            modal.style.display = "none";
        }
    }
    
}
</script>

<style scoped>
*:focus{
    outline: none;
}

.container{
    background: #091F44;
    height: 50rem;
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

.nodelete__button{
    color: white;
    border: none;
    background: #091F44;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: .5rem 0;
    transition: all ease-in-out 200ms
}

.delete__button:hover{
    background: #D1515A;
}

.nodelete__button:hover{
    background: #61cf21;
}

.button--ok:hover, .delete__button:hover, .nodelete__button:hover{
    cursor: pointer;
    transform: scale(1.1);
}

.confirmDelete-bg{
    background: #091F44;
    opacity: 0.98;
    width:100%;
    position: absolute;
    z-index: 998;
    height: 50rem;
    display: none;
}

.confirmDelete{
    background: white;
    padding: 4rem 1rem;
    border-radius: 1rem;
    width: 30%;
    position: absolute;
    top: 30%;
    left: 35%;
}

@media screen and (max-width: 768px){
  
}

@media screen and (max-width: 320px){

}
</style>