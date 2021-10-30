<template>
    <div class="container">
        
        <div class="feed">
            <div class="page__title">
                <h1 class="title">Dernières publications</h1>
            </div>

            <div class="publication" v-for="(post, idx) in posts" v-bind:key="idx">
                <div class="publication__content">
                    <p class="user">{{post.prenom}} {{post.nom}}</p>
                    <p class="content">{{post.contenu}}</p>
                    <p class="content__date">{{new Date(post.postDate).toLocaleString('fr')}}</p>
                </div>
                <button v-if="user.data.role !== 'user'" class="delete_post_btn" @click="deletePost(post.postId)" >X</button>
            </div>

            
        </div>

        <form class="poster" >
            <textarea v-model="contenu" class="poster__input" name="contenu" id="" cols="30" rows="10" placeholder="Entrez votre message ici"></textarea>
            <button class="poster__button" @click="postMessage()">Publier</button>
        </form>        
        
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
    mounted: function(){
        const userData = JSON.parse(sessionStorage.getItem('user'));
        axios.defaults.headers.common = {'Authorization': userData.token}
        this.$store.dispatch('getPosts');
        const token = userData.token;
        if(token == ''){
            this.$router.push('/');
        }
    },
    computed: {
        ...mapState({
            posts: 'feedPosts',
            user: 'user',
        })  
    },
    methods: {
        postMessage: function(){
            this.$store.dispatch('postMessage', 
            {
                contenu: this.contenu,
                id: this.user.data.id,
            })
            .catch(function(error){
                console.log(error)
            })
        },
        deletePost: function(id){
            const userData = JSON.parse(sessionStorage.getItem('user'));
            this.$router.go()
            const config = {
                    body: {
                        id: userData.data.id,
                    }
                }
            instance.delete('/delete_post/'+ id, config)
            this.$router.go()
            
        }
    }
}

</script>

<style scoped>

.container{
    position: relative;
    background: #091F44;
}

.feed{
    background:#fff;
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
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.feed::-webkit-scrollbar{
    width: 0.7rem;
}

.feed::-webkit-scrollbar-track{
    background: #D1515A;
    border-radius: 0 6rem 6rem 0 ;
}

.feed::-webkit-scrollbar-thumb{
    background: #091F44;
    box-shadow: #091F44 0 .2rem .5rem;
}

.page__title{
    margin: 1rem 0 3rem;
}

.title{
    color: #091F44;
}

.publication{
    background: #091F44;
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 60%;
    position: relative;
    left: 5rem;
    margin: 1.5rem 0 0;
    color: white;
}

.publication .user{
    text-align: left;
    font-size: 1.2rem;
    font-weight: bold;
    color:#D1515A;
    text-transform: capitalize;
}

.publication .content, .user{
    text-align: left;
    margin: .6rem 0;
}

.publication .content__date{
    font-size: .8rem;
    color: white;
    text-align: right;
}

.publication:nth-child(2n){
    background: rgb(255, 255, 255);
    padding: 1rem 1.5rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 60%;
    position: relative;
    right: 5rem;
    left: initial;
    margin: 1.5rem 0 0;
    color: #091F44;
}

.publication:nth-child(2n) .content__date{
    font-size: .8rem;
    color: #091F44;
}

.content__date{
    color:red;
    
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
    position: fixed;
    bottom: 3rem;
    right: 3rem;
}

.poster__button{
    color: #fff;
    border: none;
    background: #D1515A;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    width: 10rem;
    margin: 1rem 0;
}

.delete_post_btn{
    color: white;
    border: none;
    background: #D1515A;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .5rem 0;
    box-shadow: #D1515A 0 .1rem .3rem;
    transition: all ease-in-out 200ms;
    position: absolute;
    right: -1rem;
    top: -1.5rem;
}

.delete_post_btn:hover{
    cursor: pointer;
    transform: scale(1.2);
}

@media screen and (max-width: 768px){
.container{
    height: 90vh;
    overflow: hidden;
}

.feed{
    width: 100%;
    padding: 1rem 1.5rem;
    position: absolute;
    top:0;
    left: 0;
    border-radius: 0;
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.page__title{
    margin: .5rem 0;
}

.title{
    font-size: 1.5rem;
    line-height: 1.2rem;
}

.publication{
    padding: .5rem 1rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 70%;
    position: relative;
    left: 0;
    margin: 1rem 0 0;
    color: white;
}

.publication .user{
    font-size: 1.2rem;
}

.publication .content, .user{
    text-align: left;
    margin: .6rem 0;
}

.publication .content__date{
    font-size: .8rem;
    color: white;
    text-align: right;
}

.publication:nth-child(2n){
    padding: .5rem 1rem;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    width: 70%;
    position: relative;
    right: 2rem;
    left: initial;
    margin: 1rem 0 0;
}

.publication:nth-child(2n) .content__date{
    font-size: .8rem;
    color: #091F44;
}

.poster__input{
    margin: .5rem 0;
    padding: 1rem 0 0 1rem;
    height: 1.5rem;
    width: 80%;
}

.poster{
    padding: .5rem;
    border-radius: 0;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
    position: absolute;
    bottom: 2rem;
    right: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
}

.poster__button{
    padding: .5rem;
    border-radius: .5rem;
    width: 2rem;
    margin: 0 0 0 .5rem;
}

.delete_post_btn{
    color: white;
    border: none;
    background: #D1515A;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: .5rem 0;
    box-shadow: #D1515A 0 .1rem .3rem;
    transition: all ease-in-out 200ms;
    position: absolute;
    right: -1rem;
    top: -1.5rem;
}

.delete_post_btn:hover{
    cursor: pointer;
    transform: scale(1.2);
}
}

@media screen and (max-width: 320px){

}

</style>