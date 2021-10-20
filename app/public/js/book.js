const Book = {
    data() {
        return {
            "books": [],
            "bookForm": {},
            "selectedBook": null
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
            console.log("Posting New", this.bookForm);

            fetch('/api/book/create.php', {
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
                this.handleResetEdit();
            })
        },
        postEditBook(evt) {
            console.log("Posting", this.bookForm);

            fetch('api/book/update.php', {
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
                this.handleResetEdit();
            })
        },
        postDeleteBook(b) {
            //Security check
            //Cancel if they don't confirm
            if (!confirm("Are you sure you want to delete " + b.title + "?")) {
                return;
            }
            console.log("Deleting", b);

            fetch('api/book/delete.php', {
                method: 'POST',
                body: JSON.stringify(b),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.books = json;
                this.handleResetEdit();
            })
        },
        postBook(evt) {
            //Check if in edit mode or creating a new book
            if (this.selectedBook) {
                this.postEditBook(evt);
            } else {
                this.postNewBook(evt);
            }
        },
        handleEditBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() {
            this.selectedBook = null;
            this.bookForm = {};
        }
    },
    created() {
        this.fetchBookData();
    }
}

Vue.createApp(Book).mount('#uniqueBooks');