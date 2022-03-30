<template>
  <div id="app">
      <div id="tete">
          <img id="logo" alt="logo" src="./assets/logo.png">
     </div>
     <div class="zoo_options">
          <input type="text" v-model="search" placeholder="Chercher un animal">
          <div class="tri">
            <label for="animal_tri" >Trier par : </label>
            <select v-model="animalsSortType" id="animal_tri">
              <option value="AZNoms">Noms de A à Z</option>
              <option value="ZANoms">Noms de Z à A</option>
              <!--<option value="PoidsSup">Poids croissant</option>
              <option value="TailleSup">Taille croissante</option>-->
              <option value="VieSup">Duree de vie</option>
            </select>
          </div>
          <button  v-on:click="Rafraichir">Rafraichir</button>	
      </div>

      <div id="zoo">
        <Animal
          v-for="animal in animalsOrganizedData"
          :key="animal.id"
          :nom="animal.name"
          :nom_latin="animal.latin_name"
          :chemin_image="animal.image_link" 
          :type="animal.animal_type"
          :nourriture="animal.diet"
          :habitat="animal.habitat"
          :dureeVie="animal.lifespan"
          :hauteurMax="animal.length_max"
          :hauteurMin="animal.length_min"
          :poidsMax="animal.weight_max"
          :poidsMin="animal.weight_min"
          />
       </div>
      
  </div>

</template>

<script>

import Animal from './components/HelloWorld.vue'
import {getAnimaldata} from './API.js'

export default {
  name: 'Zoo',
  components: {
    Animal
  },

  computed: {
		animalsOrganizedData: function() {
			//const field = ["AZNoms"].includes(this.animalsSortType) 
			//const reversed = ["ZANoms"].includes(this.animalsSortType)
			//const comparator = (a, b) => a.nom.toLowerCase().localeCompare(b.nom.toLowerCase()) 
			let data = this.animalData //.sort(comparator)
			//if (reversed) data = data.reverse()
			return data;
		}
    },
  
	data() {
    return {
      animalData: [],
      search: "",
			animalsSortType: "AZNoms"
    }
  },

  created: function() {
		this.retrieveAnimalData()
	},

	methods: {
			async retrieveAnimalData() {
					this.animalData = await getAnimaldata()
          console.log(this.animalData)
			},

      async Rafraichir(event) {
      this.retrieveAnimalData();
			event.target.text = "Bouton appuyé"
		}
	}

}

</script>

<style>
#app {
    display :flex;
    flex-direction: column;
    font-family: Helvetica;
}

#zoo {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 60px;
  display :flex;
  flex-wrap: wrap;
  justify-items: flex-start;
  justify-content: space-around;
  align-items: center;
}

.zoo_options{
  display: flex;
  flex-direction: row;
    justify-content: space-around
}

#logo{
  object-fit:contain;
  width: 50%;
}


#tete{
text-align: center;
width: 100%;
}



</style>
