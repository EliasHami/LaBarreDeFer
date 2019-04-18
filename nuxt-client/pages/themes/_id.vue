<template>  
    <!-- theme section -->
    <div class="section theme" id="theme">
        <div class="container">
          <h5>{{ theme.nom_theme }}</h5>
          <p>{{ theme.description }}</p>
          <div class="row">
            <div class="col-md-12">
              <ul class="card-columns list-unstyled">
                <!-- On parcours les posts dans le store avec le bon thème -->
                <li v-for="post in posts" :key="post.id" class="card">
                  <img :src="post.Image_du_post.url" class="card-img-top">
                  <div class="card-body">
                    <nuxt-link :to="{ path: '/blogposts/' + post.id}" tag="a">
                      {{ post.Titre }}
                    </nuxt-link>
                    <p class="card-text">{{ post.Resume || 'Pas de résumé' }}.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
   
</template>

<script>

export default {
  validate ({ params }) {
    // Doit être un nombre
    return /^[0-3]$/.test(params.id)
  },
  computed: {
    theme() {
      return this.$store.getters['themes/get_theme_id'](this.$route.params.id);
    },

    posts() { 
      return this.$store.getters['blogposts/get_post_theme'](this.$route.params.id);
    }
  }  
}
</script>

