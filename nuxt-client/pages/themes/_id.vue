<template>  
    <!-- theme section -->
    <div class="section theme" id="theme">
        <div class="container">
          <h5>{{ theme.nom_theme }}</h5>
          <p>{{ theme.description }}</p>
          <!-- On parcours les posts dans le store -->
          <li v-for="post in posts" :key="post.id" class="card">
            <img :src="post.Image_du_post.url" class="card-img-top">
            <div class="card-body">
              <nuxt-link :to="{ path: '/blogposts/' + post.id}" tag="a">
                {{ post.Titre }}
              </nuxt-link>
              <p class="card-text">{{ post.Resume || 'Pas de résumé' }}.</p>
            </div>
          </li>
        </div>
    </div>
   
</template>

<script>

export default {
  validate ({ params }) {
    // Doit être un nombre
    return /^\d$/.test(params.id)
  },
  computed: {
    theme() {
      var idx = this.$route.params.id -1 
      return this.$store.getters['themes/get_theme_id'](idx)
    },

    posts() { 
      var idx = this.$route.params.id -1 
      console.log(this.$store.getters['blogposts/get_post_theme'](idx));
      return this.$store.getters['blogposts/get_post_theme'](idx)
    }
  }  
}
</script>

