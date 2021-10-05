import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8080/user'
});

const instancePost = axios.create({
    baseURL: 'http://localhost:8080/posts'
});

let user = localStorage.getItem('user');
if(!user){
    user = {
        id: -1,
        token: '',
    } 
}else{
    try{
        user = JSON.parse(user);
        instance.defaults.headers.common['Authorization'] = store.state.user.token;
    }catch{
        user = {
            id: -1,
        token: '',
        } 
    }
    
}

const store = createStore({
    state: {
        status: '',
        user: user,
        userInfos: {
            nom:'',
            prenom: '',
        },
        message:{
            contenu:'',
        },
        feedPosts: {
            contenu: '',
        }
    },
    mutations: {
        setStatus: function(state, status){
            state.status = status;
        },
        logUser: function(state, user){
            localStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function(state, userInfos){
            state.userInfos = userInfos;
        },
        teamInfos: function(state, teamInfos){
            state.teamInfos = teamInfos;
        },
        logOut: function(state){
            state.user = {
                id: -1,
                token: '',
            }
            localStorage.removeItem('user');
        },
        message: function(state, message){
            state.message = message;
        },
        feedPosts: function(state, feedPosts){
            state.feedPosts = feedPosts;
        }
    },
    actions: {
        logIn: ({commit}, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) =>{
                instance.post('/login', userInfos)
                .then(function (response) {
                    commit('setStatus', '')
                    commit('logUser', response.data)
                    resolve(response);
                 })
                .catch(function (error) {
                    commit('setStatus', 'error_login')
                    reject(error);
              });
            });
        },
        signUp: ({commit}, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) =>{
                instance.post('/signup', userInfos)
                .then(function (response) {
                    commit('setStatus', 'compte créé')
                    resolve(response);
                 })
                .catch(function (error) {
                    commit('setStatus', 'error_signup')
                    reject(error);
                });
            });
        }, 
        getUserInfos: function(){
            axios.get('http://localhost:8080/user/profile/' + store.state.user.data.id)
                .then(function(response){
                    console.log(response)
                    store.commit('userInfos', response.data[0]);
                })
        },
        getTeam: function(){
            axios.get('http://localhost:8080/user/team')
                .then(function(response){
                    console.log(response.data)
                    store.commit('teamInfos', response.data);
                })
        },
        upDate: ({commit}, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) =>{
                instance.put('/profile_update/' + store.state.user.data.id, userInfos)
                .then(function (response) {
                    commit('setStatus', 'user_updated')
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_signup')
                    reject(error);
                });
            })
        },
        postMessage: ({commit}, message) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) =>{
                instancePost.post('/create_post', message)
                .then(function (response) {
                    console.log(response)
                    commit('setStatus', 'post publié')
                    resolve(response);
                 })
                .catch(function (error) {
                    commit('setStatus', 'error_post')
                    reject(error);
                });
            });
        }, 
        getPosts: function(){
            axios.get('http://localhost:8080/posts/feed')
                .then(function(response){
                    store.commit('feedPosts', response.data)
                })
        },
    }
})    
export default store;