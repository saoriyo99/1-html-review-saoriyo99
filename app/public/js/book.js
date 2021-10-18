const Book = {
    data() {
        return {
            "books": [],
            "bookForm": {}
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
        },
        postNewBook(evt) {
            console.log("Positing", this.bookForm);

            fetch('api/book/create.php', {
                method: 'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.books = json;
                this.bookForm = {}
            })
        },
        postBook(evt) {
            
        }
    },
    created() {
        this.fetchBookData();
    }
}

Vue.createApp(Book).mount('#uniqueBooks');