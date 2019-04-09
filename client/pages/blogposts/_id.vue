<template>  
    <!-- about section -->
    <div class="section about" id="about">
        <div class="container">
            <h1 class="text-center"></h1>
            <!-- <p>
                {{ this.$route.params.id }}
            </p> -->

                <h5>{{ post.Titre }}</h5>
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
          return this.$store.getters['blogposts/list_getter'][idx]
      }
  }
}
</script>
