
<template>
  <div class="container">
    <!-- header -->
    <header class="header">
        <div class="row h-100 align-items-center">
        <div class="col-12 text-center">
        <h1 class="font-weight-bold">ELECTROSTATIK</h1>
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
                <!-- <a @click="onClickPost(post.id)">{{ post.Titre }}</a> -->
                <nuxt-link :to="{ path: '/blogposts/' + post.id}" tag="a">
                  {{ post.Titre }}
                </nuxt-link>
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
  computed: {
    blogposts() {
      return this.$store.getters['blogposts/get_post_list']
    },
    themes() {
      return this.$store.getters['themes/get_theme_list']
    }
  },
  // avant de charger la page on récupère les blogposts de strapi et on le commit dans le store
  async fetch({ store }) {
    
    await strapi.request('post', '/graphql', {
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
                  theme {
                    id
                  }
                }
                themes {
                  id
                  nom_theme
                  description
                }
              }`
      } 
    }).then((response) => {
      // add blogposts to store
      //  console.log(response.data);
      store.commit('blogposts/emptyList');
      response.data.blogposts.forEach(element => {
        element.Image_du_post.url = `${apiURL}${element.Image_du_post.url}`
        store.commit('blogposts/add', {
          id: element.id,
          ...element  // le reste des paramètres de element (element.Titre, element.Contenu, ...)
        })
      });
      // add themes to store
      store.commit('themes/emptyList');
      response.data.themes.forEach(element => {
        store.commit('themes/add', {
          id: element.id,
          ...element
        })
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })

    // ---- avec axios ----
    // import axios from "axios";
    // let axiosConfig = {
    //   headers: {
    //       'Content-Type': 'application/json'

    //   }
    // };

    // On return une promesse que nuxt va consommer
    // return axios({
    //   method: 'post',
    //   url: 'http://localhost:1337/graphql',
    //   data: {
    //     query:`query {
    //             blogposts {
    //               id
    //               Titre
    //               Contenu
    //               Date_de_publication
    //               Resume
    //               Image_du_post {
    //                 url
    //               }
    //             }
    //           }`
    //   }
    // }).then((response) => {
    //   // console.log(response.data.data.blogposts);
    //   store.commit('blogposts/emptyList');
    //   response.data.data.blogposts.forEach(element => {
    //     element.Image_du_post.url = `${apiURL}${element.Image_du_post.url}`
    //     store.commit('blogposts/add', {
    //       id: element.id,
    //       ...element  // le reste des paramètres de element (element.Titre, element.Contenu, ...)
    //     })
    //   });
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);
    // })
    
  }
}
</script>
