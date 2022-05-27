<template>
  <div id="app">
      <div id="logo_space">
          <img id="logo" alt="logo_zoo" src="./assets/logo.png">
     </div>
      <Header v-on:refresh="refresh" :search.sync="search"  :animalsSortType.sync="animalsSortType"/>
      <div v-if="animalsOrganizedData.length==0">
        <img id="oups" alt="oups_picture" src="./assets/oups.png">
      </div>
      <div v-else id="zoo">
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

      <div id="mention" :class="animalsOrganizedData.length==0?'hide':''">
         <h4>(PS : Et oui...mon zoo ne peut accueillir que 10 animaux aléatoires car 10, c'est déjà beaucoup et quand on en a trop, on ne peux pas bien s'occuper de tous et moi, je pense à la condition animale !!!)</h4>
       </div>
       <div id="credits">
         <h5>Développé par Flavien Lineuc - Mai 2022</h5>
      </div>
  </div>

</template>

<script>

import Animal from './components/animal.vue'
import Header from './components/header.vue'
import {getAnimaldata} from './API.js'

export default {
  name: 'ZooPage',
  components: {
    Animal,
    Header
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

      if(this.animalsSortType=="AZNoms"||this.animalsSortType=="ZANoms") {
        comparator = (a, b) => a.name.localeCompare(b.name) ;
      } else  comparator = (a, b) => a.latin_name.localeCompare(b.latin_name) ;
      data.sort(comparator);
      if(sortReversed==true) { data.reverse(); }
      if(lifespanSorted==true){
        data.sort(function (a, b) {
          return a.lifespan - b.lifespan;
        });}
      const filterFunc = (a) => a.name.toLowerCase().includes(this.search.toLowerCase());
      data = data.filter(filterFunc);

      console.log(data);
			return data;
  },

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


	methods: {
			async retrieveAnimalData() {
					this.animalData = await getAnimaldata()
			},

      async refresh(event) {
      this.retrieveAnimalData();
			event.target.text = "Bouton appuyé";
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

#logo{
  object-fit:contain;
  width: 50%;
}

#oups{
  display: block;
margin-left: auto;
margin-right: auto;
padding-top: 40px;
width: 50%;
}

#logo_space{
text-align: center;
width: 100%;
}

#mention, #credits{
  padding-block: 20px;
  text-align: center;
  bottom: 20px;
}

.hide{
display:none;
} 


h4, h5 {
  size: 10px;
  margin: 0;
}


@media (max-width: 450px) {
  #zoo{
    font-size:12px ;
  }
  #logo, #oups {
      width: 75%;
  }
}

</style>
