<template>  
  <b-navbar type="light" variant="light">
    
    <nuxt-link tag="a" class="b-navbar-brand" :to="'/'"><img src="~assets/img/logo.png"></nuxt-link>
    
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <li v-for="theme in themes" :key="theme.id">
          <nuxt-link :to="{ path: '/themes/' + theme.id}" tag="b-nav-item" class="btn btn-outline-primary mr-3">
            {{ theme.nom_theme }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link tag="b-nav-item" class="btn btn-outline-success mr-3" :to="'/shop'">Boutique</nuxt-link>
        </li>

        <li v-if="username">
          <b-nav-item-dropdown :text="username" class="btn btn-outline-danger mr-3" right>
            <b-dropdown-item>Mon compte</b-dropdown-item>
            <b-dropdown-item>Mes favoris</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#" @click="logout">Deconnexion</b-dropdown-item>
          </b-nav-item-dropdown>

        </li>

        <li v-if="!username">
          <nuxt-link tag="b-nav-item" class="btn btn-outline-dark mr-3" to="/login" exact>Connexion</nuxt-link>  
        </li>
        <li v-if="!username">
          <nuxt-link tag="b-nav-item" class="btn btn-outline-secondary mr-3" to="/signup" exact>Inscription</nuxt-link>
        </li>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>  

<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    themes() {
      return this.$store.getters['themes/get_theme_list']
    },
    username() {
      return this.$store.getters['auth/username']
    }
  },
  methods: {
    ...mapMutations({
      logout: 'auth/logout'
    })
  }
}   
</script>
