<template>
    <div class="container">
        
        <div class="feed">
            <div class="page__title">
                <h1 class="title">Dernières publications</h1>
            </div>

            <div class="publication" v-for="(post, idx) in posts" v-bind:key="idx">
                <p>{{post.contenu}}</p>
            </div>

            <button v-if="role !== 'user'" class="delete_post_btn" @click="deletePost()" >Supprimer mon compte</button>
        </div>

        <div class="poster" >
            <textarea v-model="contenu" class="poster__input" name="contenu" id="" cols="30" rows="10" placeholder="Entrez votre message ici"></textarea>
            <button class="poster__button" @click="postMessage()">Publier</button>
        </div>        
        
    </div>
</template>



<script>

import {mapState} from 'vuex'
const axios = require('axios');
const instance = axios.create({
    baseURL: 'http://localhost:8080/posts'
});

export default {
    name: 'Feed',
    data: function () {
        return{
            role: this.$store.state.user.data.role
        }
    },
    mounted: function(){
        this.$store.dispatch('getPosts');
        /* if(this.$store.state.user.data.id == -1 || this.$store.state.user.data.id == undefined){
            this.$router.push('/notfound');
            return;
        }else{
            
        } */
    },
    computed: {
        ...mapState({
            posts: 'feedPosts',
        })  
    },
    methods: {
        postMessage: function(){
            this.$store.dispatch('postMessage', {
                contenu: this.contenu,
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deletePost: function(){
            instance.delete('/delete_post')
        }
    }
}
    
</script>

<style scoped>

.container{
    position: relative;
}

.feed{
    background: rgb(6,0,107);
    width: 55%;
    height: 45rem;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    position: absolute;
    left: 3rem;
    bottom: 3rem;
    overflow: scroll;
}

.page__title{
    margin: 1rem 0 3rem;
}

.title{
    color:rgb(255, 255, 255);
}

.publication{
    background: rgb(0,212,255);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 60%;
    position: relative;
    left: 8rem;
    margin: 1rem 0 0;
}

.publication:nth-child(2n){
    background: rgb(255, 255, 255);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 60%;
    position: relative;
    right: 8rem;
    left: initial;
    margin: 1rem 0 0;
}

.poster__input{
    border: none;
    margin: 1rem 0;
    padding: 1rem 0 0 1rem;
    height: 5rem;
    width: 20rem;
    background: rgb(240, 240, 240);
    border-radius: .5rem;
}

.poster{
    background: rgb(255, 255, 255);
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    position: absolute;
    bottom: 3rem;
    right: 3rem;
}

.poster__button{
    color: rgb(6,0,107);
    border: none;
    background: rgb(0,212,255);
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: 1rem 0;
}

.delete_post_btn{
    color: white;
    border: none;
    background: red;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: .5rem 0;
    transition: all ease-in-out 200ms
}

.delete_post_btn:hover{
    cursor: pointer;
}

</style>