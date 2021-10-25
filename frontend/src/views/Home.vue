<template>
    <div class="container">
        <div class="page__title">
            <h1 class="title">Bienvenue sur l'intranet <br> Groupomania</h1>
        </div>
        
        <div class="form">
            <h2 class="sub_title" v-if="mode == 'login'">Se connecter</h2>
            
            <h2 class="sub_title" v-else>S'inscrire</h2>
            
            <span class="switch">
                <p class="switch__content" v-if="mode == 'login'">Vous n'avez pas de compte ? <span class="switch__content__link" @click="switchSignup()">Inscrivez-vous</span></p>
                
                <p class="switch__content" v-else>Vous avez déjà un compte ? <span class="switch__content__link" @click="switchLogin()">Connectez-vous</span></p>
            </span>

            <form action="">
                <div class="input" v-if="mode == 'signup'">
                    <input v-model="nom" type="text" name="nom" id="lname" placeholder="Entrez votre nom">
                </div>

                <div class="input" v-if="mode == 'signup'">
                    <input v-model="prenom" type="text" name="prenom" id="fname" placeholder="Entrez votre prenom">
                </div>

                <div class="input">
                    <input v-model="email" type="email" name="email" id="mail" placeholder="Entrez votre email" autocomplete="on">
                </div>

                <div class="input">
                    <input v-model="password" type="password" name="password" id="pass" placeholder="Entrez votre mot de passe" autocomplete="on">
                </div>
                
                <span class="forgot" v-if="mode == 'login' && status == 'error_login'">
                    <p class="error_login">Mot de passe et ou email incorrect</p>
                </span>
                
                <span class="forgot" v-if="mode == 'signup' && status == 'error_signup'">
                    <p class="error_login">Adresse email déjà utilisée</p>
                </span>
            </form>

            <div class="submit" v-if="mode == 'login'">
                    <button @click="logIn()" :disabled="!validatedFields" class="button--ok" :class="{'submit__button--nok': !validatedFields}">
                        <span v-if="status == 'loading'">Connexion en cours...</span>
                        <span v-else>Connexion</span>
                    </button>
                </div>

                <div class="submit" v-else>
                    <button @click="signUp()" :disabled="!validatedFields" class="button--ok" :class="{'submit__button--nok': !validatedFields}">S'inscrire</button>
                </div>
        </div>
     </div>
</template>


<script>

import {mapState} from 'vuex'

export default{
    name: 'Login',
    data: function () {
        return{
            mode: 'login',
            nom: '',
            prenom: '',
            email: '',
            password:'',
        }
    },
    computed: {
        validatedFields: function () {
            if (this.mode == 'signup'){
                if(this.nom != "" && this.prenom != "" && this.email != "" && this.password != ""){
                    return true;
                } else{
                    return false;
                }
            } else{
                if(this.email != "" && this.password != ""){
                    return true;
                } else{
                    return false;
                }
            }
        },
        ...mapState({
            user: 'user',
            status: 'status'
        })
    },
    methods:{
        switchLogin: function(){
            this.mode = 'login' ;      
        },
        switchSignup: function(){
            this.mode = 'signup' ;      
        },
        logIn: function(){
            const self = this;
            this.$store.dispatch('logIn', {
                email: this.email,
                password: this.password,
            })
            .then(function(){
                self.$router.push('/feed')
            }, function(error){
                console.log(error)
            })
        },
        signUp: function(){
            const self = this;
            this.$store.dispatch('signUp', {
                nom: this.nom,
                prenom: this.prenom,
                email: this.email,
                password: this.password,
            })
            .then(function(){
                self.logIn();
            })
            .catch(function(error){
                console.log(error)
            })
        },
    }
}

</script>

<style scoped>

.container{
    background: #091F44;
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
    color: #091F44;
}

.switch__content{
    margin: 1rem 0 0;
    font-size: 10pt;
}

.switch__content__link{
    color: #D1515A;
    text-decoration: underline;
}

.switch__content__link:hover{
    cursor: pointer;
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
    width: 25%;
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

.submit{
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0 0 0;
}

.button--ok{
    color: #fff;
    border: none;
    background: #D1515A;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
}

.button--ok:hover{
    cursor: pointer;
}

.submit__button--nok{
    color: white;
    border: none;
    background: #AEAEB0;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
}

.submit__button--nok:hover{
    cursor:not-allowed;
}

</style>