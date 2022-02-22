const getAPIdata = async function() {
    const response = await fetch("https://api.adoptapet.com") 
    if (response.status == 200) {
        const data = response.json()
    } else {
    new Error(response.statusText)
    }
}

export { getAPIdata }