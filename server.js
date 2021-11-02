const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const Animal = require('./src/models/prove03-model');
const animalRoutes = require("./server/routes/test-routes");
const MONGODB_URI = 'mongodb+srv://NewEggHome:a@cluster0.ysadg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

let path2 = path.join(__dirname, "/server/routes");
console.log("express.static(\"routes\"):", path2);
app.use(express.static("build"));

app.use("/animals", animalRoutes);
// app.use(router.get("/animals/animals", function (req, res, next) {
//     const page = req.query.page;
//     console.log('page', page);
//     let totalItems;

//     console.log("entered /animals/animals");

//     Animal.find()
//         .countDocuments()
//         .then(numProducts => {
//             totalItems = numProducts;

//             return Animal.findOne()
//             // .skip((20 - 1) * 20)
//             // .limit(20);
//         })
//         .then(animals => {
//             console.log("animals:", animals);
//             console.log("");
//             res.send({ "animals": animals });
//         })
//         .catch(err => {
//             console.log(err);
//         })
// }));

app.use(router.get("/get_location_groups", function (request, response, next) {
    new Promise(function (req, res, next) {
        Animal.find()
            .countDocuments()
            .then(numProducts => {
                return Animal.findOne()
                // .skip((page - 1) * ITEMS_PER_PAGE)
                // .limit(ITEMS_PER_PAGE);
            })
            .then(animals => {
                res.send({ "WHAT": "Okay" });
            })
            .catch(err => {
                console.log(err);
            })
    });
}));
const corsOptions = {
    // origin: "https://date-planning-app.herokuapp.com/",
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization", "Accept", "Accept-Language", "X-Authorization"],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

mongoose.connect(MONGODB_URI, options)
    .then(result => {
        const server = app.listen(PORT, () => {
            console.log("express.static(__dirname + \"/public\")", express.static(__dirname, + "/public"));
            console.log(`Listening on port ${PORT}`)
        });

        const io = require('socket.io')(server);

        io.on('connection', socket => {
            console.log('Client connected');

            socket.on('new-name', function () {
                socket.broadcast.emit('update-list');
            });
        });
    })
    .catch(err => {
        console.log(err);
    });
