const Book = {
    data() {
        return {
            "books": []
        }
    },
    computed: {
    },
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchBookData() {
            // creates a response
            fetch('/api/book/')
            // handles the promise
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.books = parsedJSON;
            })
            .catch(err => {
                console.error(err)
            })
        }
    },
    created() {
        this.fetchBookData();
    }
}

Vue.createApp(Book).mount('#uniqueBooks');