
<template>
  <div class="container">
    <!-- shop section -->
    <section id="shop">
      <div class="row">
        <div class="col-md-8">
          <ul class="card-columns list-unstyled">
            <li v-for="element in shop" :key="element.id" class="card">
              <img :src="element.photos_1.url" class="card-img-top">
              <div class="card-body">
                <!-- <nuxt-link :to="{ path: '/blogposts/' + element.id}" tag="a">
                  {{ element.nom_item }}
                </nuxt-link> -->
                <h5 class="card-title">{{ element.nom_item }}</h5>
                <p class="card-text">{{ element.description || 'No description provided.' }}</p>
                <p class="card-text">{{ element.prix }}€</p>
                <button class="btn btn-primary" @click="addToCart(element)">Add to card</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Card</h5>
              <p class="card-text">{{ numberOfItems }} items selected:</p>
              <ul>
                <li v-for="item in selectedItems" :key="item.id" class="card-text mb-2">
                  Name: {{ item.nom_item }} (${{ item.prix }}) ({{ item.quantity }})
                  <button class="btn btn-sm btn-success" @click="addToCart(item)">+</button>
                  <button class="btn btn-sm btn-warning ml-2" @click="removeFromCart(item)">-</button>                
                </li>
              </ul>
              <h5 class="card-text">
                Total: ${{ prix }}
              </h5>
              <p v-if="!selectedItems.length">Please select some items</p>
              <button :disabled="!selectedItems.length" class="btn btn-primary">Order</button>
            </div>
          </div>
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
import { mapMutations } from 'vuex'

export default {
  data(){
    return {
      query: '',
      complete: false
    }
  },
  computed: {
    shop() {
      return this.$store.getters['shop/get_shop_list']
    },
    selectedItems() {
      return this.$store.getters['cart/items']
    },
    prix() {
      return this.$store.getters['cart/prix']
    },
    numberOfItems() {
      return this.$store.getters['cart/numberOfItems']
    }
  },
  
  async fetch({ store }) {
    
    await strapi.request('post', '/graphql', {
     data: {
       query: `query {
                shops {
                  id
                  nom_item
                  description
                  quantite_restante
                  prix
                  categorie
                  photos_1 {
                    url
                  }
                }
              }`
      } 
    }).then((response) => {
    //    console.log(response.data.shops);
      store.commit('shop/emptyList');
      response.data.shops.forEach(element => {
        element.photos_1.url = `${apiURL}${element.photos_1.url}`
        store.commit('shop/add', {
          id: element.id,
          ...element
        })
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
  }, methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove',
      emptyCart: 'cart/emptyList'
    })
  }
}
</script>
