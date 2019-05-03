
<template>
  <div class="container">
    <!-- signup section -->
    <section id="signup">
        <div class="col-md-6 offset-md-3 mt-3">
            <!-- On empêche la soumission de form avec @submit.stop.prevent et on redirige vers la methode handleSubmit -->
            <form autocomplete="off" @submit.stop.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">Nom d'utilisateur</label>
                    <b-form-input
                        id="username"
                        v-model="username"
                        type="text"
                        autofocus="true"
                        placeholder="Entrez votre nom d'utilisateur"
                        required/>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <b-form-input
                        id="email"
                        v-model="email"
                        type="email"
                        autofocus="true"
                        placeholder="Entrez votre email"
                        required/>
                   </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <b-form-input
                        id="password"
                        v-model="password"
                        label="password"
                        type="password"
                        class="form-control"
                        autofocus="true"
                        placeholder="Entrez votre mot de passe"
                        required/>
                </div>
                <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Submit</button>
                <p class="text-center mt-3">
                    Déjà inscrit ?
                    <nuxt-link to="/login" tag="a">
                        Connexion
                    </nuxt-link>
                </p>
            </form>
        </div>
    </section>
  </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiUrl = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiUrl)
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: '',
            username: '',
            // A Faire plus tard
            // civilite : '',
            // nom: '',
            // prenom: '',
            // adresse: '',
            // complement_adresse: '',
            // code_postale: '',
            // ville: '',
            // telephone: '',
            loading: false
        }
    },
    methods: {
        async handleSubmit() {
            try{
                this.loading = true
                const response = await strapi.register(
                    this.username,
                    this.email,
                    this.password
                )
                this.loading = false;
                this.setUser(response.user)
                this.$router.push('/')
            } catch(err){
                this.loading = false
                alert(err.message || 'Une erreur est survenue')
            }
        },
        ...mapMutations({
            setUser: 'auth/setUser'
        })
    },

}
</script>
