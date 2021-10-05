<template>
    <div class="container">
        <div class="page__title">
            <h1 class="title">Mon équipe</h1>
        </div>

        <div class="profil__card" v-for="(teams, idx) in team" v-bind:key="idx">
            <div class="profil__card__infos">
                <p class="user_infos" v-for="nom in team" v-bind:key="nom">{{team.nom}}</p>
                <p class="user_infos"></p>
                <p class="user_infos"></p>
            </div>
        </div>
    </div>
</template>

<script>

import {mapState} from 'vuex'

export default {
    name: 'Team',
    mounted: function(){
        if(this.$store.state.user.data.id == -1 || this.$store.state.user.data.id == undefined){
            this.$router.push('/notfound');
            return;
        }else{
            this.$store.dispatch('getTeam');
        }
    },
    computed: {
        ...mapState({
            team: 'teamInfos',
        })  
    },
    methods: {
        viewProfil: function(){
            this.$router.push('/profile/' + this.$store.state.user.data.id);
        },
    }
    
}
</script>

<style scoped>

.profil__card{
    background: rgb(255, 255, 255);
    padding: 2rem 0;
    width: 20%;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 1rem;
    box-shadow: rgb(20, 17, 70) 0.1rem 0.1rem 0.8rem;
}


</style>