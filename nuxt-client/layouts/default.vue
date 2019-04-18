<template>
  <div>
    <head>
	    <title>ELECTROSTATIK</title>
    </head>
    <Header/>
    <!-- En important nuxt on a pas besoin d'appeler les librairies (Bootstrap, Vue, ..) -->
    <nuxt/>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>