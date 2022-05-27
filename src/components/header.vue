<template>
  <div class="zoo_options">
          <input id="search" type="text" v-model="search" @input="onSearchChanged"  placeholder="Chercher un animal">
          <div class="sort">
            <label id="sortTypeList" for="animalSort" >Trier par : </label>
            <select v-model="animalsSortType" @input="onAnimalsSortTypeChanged" id="animalsSortType">
              <option value="AZNoms">Noms de A à Z</option>
              <option value="ZANoms">Noms de Z à A</option>
              <option value="AZNomsLatins">Noms Latins de A à Z</option>
              <option value="ZANomsLatins">Noms Latins de Z à A</option>
              <option value="VieSup">Duree de vie</option>
            </select>
          </div>
          <button id="refresh" v-on:click="refresh()">Nouveau zoo</button>	
  </div>
</template>

<script>
export default {
	name: "Header",
  
  props: {
		search: String,
		animalsSortType: String
  },

  watch:{
    animalsSortType : function(newAnimalsSortType){
       localStorage.setItem("animalsSortType",newAnimalsSortType);
    },
  },

  methods: {
      refresh: function() {
        this.$emit('refresh')
      },
      onSearchChanged(event) {
        this.$emit('update:search', event.target.value) 
      },
      onAnimalsSortTypeChanged(event) {
        this.$emit('update:animalsSortType', event.target.value) 
      },
  }
}
</script>

<style scoped>

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

#refresh #search #sortTypeList{
    font-family: Helvetica;
    font-size:16px ;
}

#sortTypeList{
  color: white;
}

@media (max-width: 450px) {
  .zoo_options{
    flex-wrap:wrap;
  }
  #refresh, #animalsSortType {
  margin-top: 10px;
}
}

@media (max-width: 310px) {
  .sort{
      text-align: center;
  }
}

</style>
