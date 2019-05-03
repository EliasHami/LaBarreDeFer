<template>
    <div class="container">
        <!-- Account section -->
        <section id="account">
            <div class="col-md-6 offset-md-3 mt-3">
                <form autocomplete="off" @submit.stop.prevent="handleSubmit">
                    <h3 class="font-weight-bold">Gestion du compte</h3>
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
                        <label for="nom">Nom d'utilisateur</label>
                        <b-form-input
                            id="nom"
                            v-model="username"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre nom d'utilisateur"
                            required/>
                    </div>
                    <h3 class="font-weight-bold">Adresse</h3>
                    <div class="form-group">
                        <label for="civilite">Civilité</label>
                        <b-form-select id="civilite" v-model="civilite" :options="options" class="mb-3">
                        </b-form-select>
                    </div>
                    <div class="form-group">
                        <label for="nom">Nom</label>
                        <b-form-input
                            id="nom"
                            v-model="nom"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre nom"/>
                    </div>
                    <div class="form-group">
                        <label for="prenom">Prénom</label>
                        <b-form-input
                            id="prenom"
                            v-model="prenom"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre prénom"/>
                    </div>
                    <div class="form-group">
                        <label for="adresse">Adresse</label>
                        <b-form-input
                            id="adresse"
                            v-model="adresse"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre adresse"/>
                    </div>
                    <div class="form-group">
                        <label for="complement_adresse">Complement d'adresse</label>
                        <b-form-input
                            id="complement_adresse"
                            v-model="complement_adresse"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre complément d'adresse"/>
                    </div>
                    <div class="form-group">
                        <label for="code_postal">Code postal</label>
                        <b-form-input
                            id="code_postal"
                            v-model="code_postal"
                            type="number"
                            autofocus="true"
                            placeholder="Entrez votre code postal"/>
                    </div>
                    <div class="form-group">
                        <label for="ville">Ville</label>
                        <b-form-input
                            id="ville"
                            v-model="ville"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre ville"/>
                    </div>
                    <div class="form-group">
                        <label for="pays">Pays</label>
                        <b-form-input
                            id="pays"
                            v-model="pays"
                            type="text"
                            autofocus="true"
                            placeholder="Entrez votre pays"/>
                    </div>
                    <button :disabled="loading" type="submit" class="btn btn-primary btn-block mt-3">Modifer le compte</button>
                    <p class="text-center mt-3">
                        <a href="" @click="changePwd()"> 
                            Modifier le mot de passe
                        </a>
                    </p>
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import Strapi from 'strapi-sdk-javascript/build/main'
const apiURL = process.env.API_URL || 'http://localhost:1337'
const strapi = new Strapi(apiURL)
import { mapMutations } from 'vuex'

export default {
    data (){
        return{
            email: this.$store.getters['auth/email'],
            username: this.$store.getters['auth/username'],
            password: '',
            civilite: this.$store.getters['auth/civilite'],
            nom: this.$store.getters['auth/nom'],
            prenom: this.$store.getters['auth/prenom'],
            adresse: this.$store.getters['auth/adresse'],
            complement_adresse: this.$store.getters['auth/complement_adresse'],
            code_postal: this.$store.getters['auth/code_postal'],
            ville: this.$store.getters['auth/ville'],
            pays: this.$store.getters['auth/pays'],
            loading: false,
            options: [
                { value: 'Monsieur', text: 'Monsieur' },
                { value: 'Madame', text: 'Madame' },
                { value: 'Mademoiselle', text: 'Mademoiselle' }
            ]
        }
    },
    computed: {
        user_id () {
            return this.$store.getters['auth/user_id'];
        }
    },
    mounted() {

        console.log(this.nom);
        console.log(this.prenom);
    },
    methods: {
        async changePwd(){
            this.loading = true;
            const response = await strapi.forgotPassword(this.$store.getters['auth/email'],"http://localhost:3000/")
            this.loading = false;
        },
        async handleSubmit() {
            this.loading = true;
            
            // update entrey pour mail et user et changepwd pour mdp
            await strapi.request('post', '/graphql', {
                data: {
                    query: `mutation {
                                    updateUser(input: {
                                        where: {
                                            id: `+this.user_id+`
                                        },
                                        data: {
                                            username: "`+this.username+`"
                                            email: "`+this.email+`"
                                            adresse: "`+this.adresse+`"
                                            code_postal: "`+this.code_postal+`"
                                            ville: "`+this.ville+`"
                                            pays: "`+this.pays+`"
                                            complement_adresse: "`+this.complement_adresse+`"
                                            Civilite: `+this.civilite+`
                                            nom: "`+this.nom+`"
                                            prenom: "`+this.prenom+`"
                                        }
                                    }) 
                                    {
                                        user {
                                            username
                                            email
                                            adresse
                                            code_postal
                                            ville
                                            pays
                                            complement_adresse
                                            Civilite
                                            nom
                                            prenom
                                        }
                                    }
                                }`
                    } 
                }).then((response) => {
                    this.loading = false;
                    this.logout();
                    alert("Votre compte à été modifié avec succes. Veuillez vous reconnecter");
                    this.$router.push('/login');
                })
                .catch(function (error) {
                    this.loading = false;
                    // handle error
                    console.log(error);
                })
        },
        ...mapMutations({
            setUser: 'auth/setUser',
            logout: 'auth/logout'
        })
    }
}
</script>
