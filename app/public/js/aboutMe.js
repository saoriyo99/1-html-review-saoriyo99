const RandomPerson = {
    data() {
        return {
            "students": [],
            "offers": [],
            "selectedStudent": null,
            "selectedOffer": null,
            "person": {
                "name": {},
                "dob": {},
                "picture": {},
                "location": {},
                "email": {}
            },
            "offerForm": {}
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
        selectStudent(s) {
            // Don't fetch same student multiple times
            if (s == this.selectedStudent) {
                return;
            }
            // Set student
            this.selectedStudent = s;
            // Clear out offers array
            this.offers = [];
            // Get offers from student
            this.fetchOfferData(this.selectedStudent);
        },
        fetchStudentData() {
            // creates a response
            fetch('/api/student/')
            // handles the promise, either completes or it doesn't
            // parameter response, returns response.json
            .then(response => response.json())
            .then((parsedJSON) => {
                console.log(parsedJSON);
                this.students = parsedJSON;
            })
            .catch(err => {
                console.error(err)
            })
        },
        fetchOfferData(s) {
            console.log("Fetching offers for", s);
            // creates a response
            fetch('/api/offer/?student=' + s.id)
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
        },
        fetchUserData() {
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
        },
        postNewOffer(evt) {
            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Positing", this.offerForm);

            fetch('api/offer/create.php', {
                method: 'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.offers = json;
                this.handleResetEdit();
            })
        },
        postOffer(evt) {
            //Check if in edit mode or creating a new offer
            if (this.selectedOffer) {
                this.postEditOffer(evt);
            } else {
                this.postNewOffer(evt);
            }
        },
        postEditOffer(evt) {
            this.offerForm.id = this.selectedOffer.id;
            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Positing", this.offerForm);

            fetch('api/offer/update.php', {
                method: 'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                //Save results
                this.offers = json;
                //Reset the form
                this.handleResetEdit();
            })
        },
        postDeleteOffer() {
            this.offerForm.id = this.selectedOffer.id;
            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Posting", this.offerForm);

            fetch('api/offer/delete.php', {
                method: 'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "Content-Type": "application/json; charset-utf-8"
                }
            })
            .then( response => response.json())
            .then( json => {
                console.log("Returned from post:", json);
                this.offers = json;
                this.handleResetEdit();
            })
        },
        handleEditOffer(offer) {
            //Set selectedOffer to offer that was just clicked
            this.selectedOffer = offer;
            //Won't immediately update the table, will create object first
            this.offerForm = Object.assign({}, this.selectedOffer);
        },
        handleDeleteOffer(offer) {
            this.selectedOffer = offer;
            this.offerForm = Object.assign({}, this.selectedOffer);
            this.postDeleteOffer();
        },
        handleResetEdit() {
            this.selectedOffer = null;
            this.offerForm = {};
        }
    },
    created() {
        // this.fetchUserData();
        this.fetchStudentData();
    }
}

Vue.createApp(RandomPerson).mount('#uniquePerson');