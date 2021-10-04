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
            <p>{{this.$store.state.user.data.id}}</p>

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
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: 'Profil',
    mounted: function(){
        if(this.$store.state.user.data.id == -1 || this.$store.state.user.data.id == undefined){
            this.$router.push('/');
            return;
        }else{
            this.$router.push('/profile/' + this.$store.state.user.data.id);
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
            this.$store.commit('logout');
            this.$router.push('/');
        },
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
    }
    
}
</script>

<style scoped>
*:focus{
    outline: none;
}

.container{
    background: linear-gradient(45deg, rgba(6,0,107,1) 0%, rgba(9,120,121,1) 35%, rgba(0,212,255,1) 100%);
    height: 52.7rem;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.page__title{
    margin: 5rem 0 5rem;
}

.title{
    color: rgb(255, 255, 255);
    line-height: 30pt;
}

.sub_title{
    margin: .5rem 0 0;
    color: rgb(6,0,107);
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
}

.button--ok{
    color: rgb(6,0,107);
    border: none;
    background: rgb(0,212,255);
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: 1rem 0;
}

.logout__button{
    color: white;
    border: none;
    background: rgb(6,0,107);
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
}

.button--ok:hover, .logout__button:hover{
    cursor: pointer;
}


</style>