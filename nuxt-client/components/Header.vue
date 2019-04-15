<template>  
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <nuxt-link tag="a" class="navbar-brand" :to="'/'">LaBarreDeFer</nuxt-link>
      <ul class="navbar-nav">
        <nuxt-link tag="a" class="navbar-brand" :to="'/about'">A propos</nuxt-link>
        <nuxt-link tag="a" class="navbar-brand" :to="'/shop'">Boutique</nuxt-link>
      </ul>
    </div>
  </nav>
</template>  