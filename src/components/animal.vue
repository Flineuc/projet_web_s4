<template>
  <div class="Animal">
    <h2 class="name"> {{nom}} </h2>
    <p class="latin_name"> {{nom_latin}} </p>
    <div id="photo">
          <img alt="animal_picture" v-bind:src="chemin_image" width=100% height=100%>
     </div> 
     <div id="description">
      <h3>Type</h3>
        <label>{{type}}</label>
      <h3 class="details">Caractéristiques</h3>
        <li> <label> Nourriture: </label>{{nourriture}}</li>
        <li> <label> Durée de vie: </label>{{dureeVie}}<label> ans </label> </li>
        <li>  <label> Habitat: </label>{{habitat}} </li>
      <h3>Taille</h3>
        <label>De </label>{{hauteurMin}}
        <label>à </label>{{hauteurMax}}<label> pieds (1 pied = 0.3 m)</label>
      <h3>Poids</h3>
        <label>De </label>{{poidsMin}}
        <label>à </label>{{poidsMax}}<label> livres (1 livre = 0.45 Kg)</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Animal',
  props: {
    nom: {String, required: true},
    nom_latin: {String, required: true},
    type: {String, required: true},
    nourriture: {String, required: true},
    habitat: {String, required: true},
    dureeVie: {String, required: true},
    hauteurMax: {String, required: true},
    hauteurMin: {String, required: true},
    poidsMax: {String, required: true},
    poidsMin: {String, required: true},   
    chemin_image: {type: String, default: "./animal.png"}
  }
}
</script>

<style scoped>
h2 {
  margin-block-start: 0em;
   margin-block-end: 0em;
   color:rgb(255, 255, 255);
   size: 100px;
   margin-bottom: 2;
   font-weight: bold;
}

h3 {
  margin-block-start: 0em;
   margin-block-end: 0em;
   color:rgb(255, 255, 255);
   font-weight: bold;
   margin-top: 10px;
}

.details {
  display: flex;
  flex-direction: column;
}

.Animal {
    width: 400px;
    padding: 10px;
    margin: 10px;
    background: #000000;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    justify-items: space-around;
    min-height: 330px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 70px 63px -60px black;
}

.Animal #description{
  opacity: 0;
    position: absolute;
    text-align: start;
    width: fit-content;
    margin-top: 60px;
    margin-left: 10px;
    margin-right: 10px;
}

.Animal #photo{
  size: inherit;
  filter: blur(0);
}

.Animal:hover #photo{
  filter: blur(4px) brightness(50%);
}

.Animal:hover #description{
  opacity: 1;
}

p{
  margin-bottom: 10;
   margin-top: 0;
   font-style: italic;
   color:white;

}

@media (max-width: 450px) {
  .Animal #description{
    margin-top: 30px;
    margin-right: 10px;
  }
  .Animal{
    min-height: 250px;
  }

}


</style>
