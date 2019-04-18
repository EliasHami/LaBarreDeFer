<template>  
    <!-- post section -->
    <div class="section post" id="post">
        <div class="container">
            <h5>{{ post.Titre }}</h5>
            <p>{{ post.Contenu }}</p>
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
      post() {
          var idx = this.$route.params.id -1 
          return this.$store.getters['blogposts/get_post_id'](idx)
      }
  }
}
</script>
