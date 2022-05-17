<template>
  <div id="app">
      <div id="espace_logo">
          <img id="logo" alt="logo" src="./assets/logo.png">
     </div>
     <div class="zoo_options">
          <input id="recherche" type="text" v-model="search" placeholder="Chercher un animal">
          <div class="tri">
            <label id="tri_titre" for="animal_tri" >Trier par : </label>
            <select v-model="animalsSortType" id="animal_tri">
              <option value="AZNoms">Noms de A à Z</option>
              <option value="ZANoms">Noms de Z à A</option>
              <option value="AZNomsLatins">Noms Latins de A à Z</option>
              <option value="ZANomsLatins">Noms Latins de Z à A</option>
              <option value="VieSup">Duree de vie</option>
            </select>
          </div>
          <button id="refresh" v-on:click="Rafraichir">Rafraichir</button>	
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
      <label id="raison" >(en fait, ya que 10 animaux tirés au hasard dans tous les animaux répertoriés sur Wikipédia parce qu’il fallait payer pour pouvoir en avoir plus et je peux pas trop me permettre car j’essaie d’économiser pour le Canada de l’année prochaine et je ne suis même pas sûr d’être payé en stage cet été... )</label>
  </div>

</template>

<script>

import Animal from './components/animal.vue'
import {getAnimaldata} from './API.js'

export default {
  name: 'Zoo',
  components: {
    Animal
  },

  computed: {
		animalsOrganizedData: function() {
      
      let lifespanSorted;
      let sortReversed;
      let data = this.animalData;
      let comparator;

			if(this.animalsSortType=="AZNoms" || this.animalsSortType=="AZNomsLatins"){
        sortReversed = false;
      }
      if(this.animalsSortType=="ZANoms" || this.animalsSortType=="ZANomsLatins") {
        sortReversed = true;
      }
      if(this.animalsSortType=="VieSup") {
          lifespanSorted=true;
      }

      if(this.animalsSortType=="AZNoms"||this.animalsSortType=="ZANoms") {  comparator = (a, b) => a.name.localeCompare(b.name) ;	  } 
      else  comparator = (a, b) => a.latin_name.localeCompare(b.latin_name) ;
      data.sort(comparator);
      if(sortReversed==true) { data.reverse(); }
      if(lifespanSorted==true){ data.sort(function (a, b) {
        return a.lifespan - b.lifespan;
      });}

      const filterFunc = (a) => a.name.toLowerCase().includes(this.search.toLowerCase());
      data = data.filter(filterFunc);
      
			return data;
  }
  },
  
	data() {
    return {
      animalData: [],
      search: "",
      page: "0",
			animalsSortType: localStorage.getItem("animalsSortType")
    }
  },

  created: function() {
		this.retrieveAnimalData()
	},

  watch:{
    animalsSortType : function(nvoanimalsSortType){
       localStorage.setItem("animalsSortType",nvoanimalsSortType);
    },
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
  justify-content: space-around;
  align-content: space-around;
  font-family: Helvetica;
  background: black;
  padding-block: 10px;
  border-radius: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

#logo{
  object-fit:contain;
  width: 50%;
}


#espace_logo{
text-align: center;
width: 100%;
}

#raison{
  padding-block: 20px;
  text-align: center;
}

#refresh #recherche #tri_titre{
    font-family: Helvetica;
    font-size:16px ;
}

#tri_titre{
  color: white;
}

@media (max-width: 450px) {
  #zoo{
    font-size:12px ;
  }
  .zoo_options{
    flex-wrap:wrap;
  }

}

</style>
