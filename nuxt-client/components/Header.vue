<template>  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxt-link tag="a" class="navbar-brand" :to="'/'"><img src="~assets/img/logo.png"></nuxt-link>
      <!-- <img src="~assets/img/logo.png" alt=""> -->
      <ul class="navbar-nav">
        <li v-for="theme in themes" :key="theme.id">
          <nuxt-link :to="{ path: '/themes/' + theme.id}" tag="a" class="navbar-brand">
            {{ theme.nom_theme }}
          </nuxt-link>
        </li>
        <nuxt-link tag="a" class="navbar-brand" :to="'/shop'">Boutique</nuxt-link>
        <nuxt-link tag="a" class="navbar-brand" :to="'/about'">A propos</nuxt-link>
      </ul>
    </div>
  </nav>
</template>  

<script>
  export default {
    computed: {
      themes() {
        return this.$store.getters['themes/get_theme_list']
      }
    }
  }   
</script>
