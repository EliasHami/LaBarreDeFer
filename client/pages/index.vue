
<template>
  <div class="container">
    <!-- header -->
		<header class="header">
			  <div class="row h-100 align-items-center">
          <div class="col-12 text-center">
            <h1 class="font-weight-bold">LaBarreDeFer</h1>
            <p class="lead">On peut tout faire ...</p>
          </div>
			  </div>
		</header>

    <!-- blog section -->
    <section id="blog">
      <div class="row">
        <div class="col-md-12">
          <ul class="card-columns list-unstyled">
            <!-- On parcours les posts dans le store -->
            <li v-for="post in blogposts" :key="post.id" class="card">
              <img :src="post.Image_du_post.url" class="card-img-top">
              <div class="card-body">
                <a @click="onClickPost(post.id)">{{ post.Titre }}</a>
                <p class="card-text">{{ post.Resume || 'Pas de résumé' }}.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Import Strapi
import Strapi from 'strapi-sdk-javascript/build/main'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)

export default {
  data(){
    return {
      query: ''
    }
  },
  methods: {
    onClickPost(id){
      this.$router.push('/blogposts/'+id)
    }
  },
  computed: {
    blogposts() {
      return this.$store.getters['blogposts/list_getter']
    }
  },
  // avant de charger la page on récupère les blogposts de strapi et on le commit dans le store
  async fetch({ store }) {
    store.commit('blogposts/emptyList')
    debugger;
    const response = await strapi.request('post', '/graphql', {
     data: {
       query: `query {
                blogposts {
                  id
                  Titre
                  Contenu
                  Date_de_publication
                  Resume
                  Image_du_post {
                    url
                  }
                }
              }`
      } 
    })
    response.data.blogposts.forEach(element => {
      element.Image_du_post.url = `${apiURL}${element.Image_du_post.url}`
      store.commit('blogposts/add', {
        id: element.id,
        ...element
      })
    });
  }
}
</script>
