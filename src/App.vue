<template>
  <div id="app">
      <div id="tete">
          <img alt="Vue logo" src="./assets/logo.png">
     </div>

      <div id="liste">
        <HelloWorld msg="Animal 1"/>
        <HelloWorld msg="Animal 2"/>
        <HelloWorld msg="Animal 3"/>
       </div>

  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
}

#liste {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ea00ff;
  margin-top: 60px;
  display :flex;
  justify-items: flex-start;
}


</style>
