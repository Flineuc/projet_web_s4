const getAnimaldata = async function() {
    const response = await fetch("https://zoo-animal-api.herokuapp.com/animals/rand/10") 
    if (response.status == 200) {
        const data = await response.json()
        return data
    } else {
    new Error(response.statusText)
    }
}

export { getAnimaldata }