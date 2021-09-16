const Offer = {
    // Data is a function
    data() {
    // Returns a javascript object
      return {
        "person":{},
        "offers": [
            {
                "id": 1,
                "name": "John Doe",
                "offer": 20000,
                "bonus": 4000,
                "company": "EY",
                "offerDate": "2021-09-22"
            }
        ],
        "dummy": "dummy: hello",
        "total": 5,
        "list": ["plant", "food", "dog"]

        // "offers": [
        //     {
        //        "id": 1,
        //        "Person": "John", 
        //        "Offer": ["Salary": 88000, "Bonus": 10000, "Company": "Salesforce", "Offer Date": "2021-08-12"]]
        //     },
        //     {
        //        "id": 2,
        //        "Person": "Kate",
        //        "Offer": [["Salary": 68000, "Bonus": 1000, "Company": "Google", "Offer Date": "2021-09-22"], ["Salary": 60,000, "Bonus": 5000, "Company": "Chase", "Offer Date": "2021-07-11"]]
        //     }
        // ]
      }
    },

    // called after view application is created
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
  };
  
  // Vue.createApp(Offer).mount('#counter');