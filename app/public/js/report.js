const RandomPerson = {
    data() {
        return {
            "offers":[]
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchOfferData(s) {
            // creates a response
            fetch('/api/report/')
            // handles the promise
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.offers = parsedJSON;
            })
            .catch(err => {
                console.error(err)
            })
        }
    },
    created() {
        this.fetchOfferData();
    }
}

Vue.createApp(RandomPerson).mount('#reportApp');