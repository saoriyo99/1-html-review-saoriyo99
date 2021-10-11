const RandomPerson = {
    data() {
        return {
            "students": [],
            "offers": [],
            "selectedStudent": null,
            "person": {
                name: {},
                dob: {},
                picture: {},
                location: {},
                email: {}
            },
            offerForm: {}
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
                this.offerForm = {}
            })
        }
    },
    created() {
        // this.fetchUserData();
        this.fetchStudentData();
    }
}

Vue.createApp(RandomPerson).mount('#uniquePerson');