<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/team">Team</router-link>
    <router-link to="/profil/:id">Profil</router-link>
  </nav>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav{
  background: rgb(255, 255, 255);
  height: 6rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow:rgb(45, 43, 78) 0 .5rem 1.4rem;
  position: relative;
  z-index: 99;
}

a {
  display: inline-block;
  padding: 2.45rem;
  text-decoration: none;
  color: rgb(20, 17, 70);
  transition:  all ease-in-out 200ms;
}

a:hover{
  background:  #0799AC;
  color: #fff;
}
</style>
