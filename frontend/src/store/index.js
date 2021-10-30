import { createStore } from 'vuex'

const axios = require('axios');

const instance = axios.create({
    baseURL: 'http://localhost:8080/user'
});

// const instanceBase = axios.create({
//     baseURL: 'http://localhost:8080'
// });

const instancePost = axios.create({
    baseURL: 'http://localhost:8080/posts'
});

const user = JSON.parse(sessionStorage.getItem('user'));

const store = createStore({
    state: {
        status: '',
        user: user,
        message:{
            contenu:'',
        },
        feedPosts: {
            contenu: '',
            
        },
        userData: {
            nom: '',
            prenom: '',
            email: '',
        },
        headerToken: '',
    },
    mutations: {
        setStatus: function(state, status){
            state.status = status;
        },
        logUser: function(state, user){
            sessionStorage.setItem('user', JSON.stringify(user));
            state.user = user;
        },
        userInfos: function(state, user){
            state.userInfos = user;
        },
        message: function(state, message){
            state.message = message;
        },
        feedPosts: function(state, feedPosts){
            state.feedPosts = feedPosts;
        },
        userData: function(state, userData){
            state.userData = userData;
        },
        setHeaderToken: function(state,headerToken){
            state.setHeaderToken = headerToken;
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
        logOut: function(){
            sessionStorage.removeItem('user');
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
                    store.commit('userData', response.data[0]);
                })
        },
        upDate: ({commit}, userData) => {
            return new Promise((resolve, reject) =>{
                instance.put('/profile_update/' + store.state.user.data.id, userData)
                .then(function(){
                    this.$router.go()
                })
                .then(function (response) {
                    commit('userData', response)
                    resolve(response);
                })
                .catch(function (error) {
                    commit('setStatus', 'error_update')
                    reject(error);
                });
            })
        },
        postMessage: ({commit}, posts) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) =>{
                const config = {
                    headers: {
                        Authorization: user.token,
                    }
                }
                instancePost.post('/create_post', posts, config)
                .then(function (response) {
                    resolve(response);
                 })
                .catch(function (error) {
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