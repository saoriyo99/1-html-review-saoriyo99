const RandomPerson = {
    data() {
        return {
            "person":{}
        }
    },

    created() {
        // creates a response
        fetch('https://randomuser.me/api/')
        // handles the promise
        // parameter response, returns response.json
        .then(response => response.json())
        .then((parsedJSON) => {
            console.log(parsedJSON);
            this.person = parsedJSON.results[0];
        })
        .catch(err => {
            console.error(err)
        })
    }
}

Vue.createApp(RandomPerson).mount('#uniquePerson');