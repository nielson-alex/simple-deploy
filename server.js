const mongoose = require("mongoose");
const express = require("express");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const Animal = require('./src/models/prove03-model');
const User = require("./src/models/users");
// const user = "qqsqyszjxqcege";
const user = "postgres";
const host = "ec2-18-213-179-70.compute-1.amazonaws.com";
// const host = "pg.eqxnutra.com";
// const host = "10.0.0.249";
const database = "d3nksggl3kplk8";
// const database = "equinox";
// const database = "postgres";
const password = "8afe68ffe64518067a8eee198845896ed49a09f030f2284af51caf43bb04eb67";
// const password = "";
// const schema = "";
const schema = "sandbox";
let pgPort = 5432;

const path = require("path");

// const animalRoutes = require(path.join(__dirname, "/server/routes/animal-routes"));
// const animalController = require(path.join(__dirname, "/server/controllers/animal-controller"));

const cors = require("cors");
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require("csurf");
// const flash = require("connect-flash");
// const multer = require("multer");

const MONGODB_URI = 'mongodb+srv://NewEggHome:a@cluster0.ysadg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: "sessions"
// });

function setUpPool() {
    const Pool = require("pg").Pool;
    const pool = new Pool({
        user: user,
        host: host,
        database: database,
        password: password,
        port: pgPort,
    });

    return pool;
}

app.use(express.static("build"));
// app.use(
//     session({
//         secret: "my secret",
//         resave: false,
//         saveUninitialized: false,
//         store: store
//     })
// );
// app.use(flash());
app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});
app.use(router.get("/animals/animals", function (req, res, next) {
    const page = req.query.page;
    console.log('page', page);
    let totalItems;

    console.log("entered /animals/animals");

    Animal.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;

            return Animal.findOne()
            // .skip((20 - 1) * 20)
            // .limit(20);
        })
        .then(animals => {
            console.log("animals:", animals);
            console.log("");
            res.send({ "animals": animals });
        })
        .catch(err => {
            console.log(err);
        })
}));

// app.use("https://data.heroku.com/dataclips/lwuapeleoruanrvdlcsuajvyxfdw", function (request, response, next) {
//     const query = `
//             SELECT  *
//             FROM    actro
//     `;

//     console.log("query:", query);

//     new Promise(function (resolve, reject) {
//         // response.send({ "Sasha breed": "Calico" });

//         setUpPool().query(query,
//             function (error, results) {
//                 if (error) {
//                     reject(error);
//                 }

//                 if (results?.rows?.length > 0) {
//                     console.log("results.rows:", results.rows);
//                     const data = results.rows;

//                     response.send({ "data": data });
//                 } else {
//                     response.send({
//                         "error": "No results found"
//                     });
//                 }
//             });
//     });

//     // console.log("called right API");
//     // response.send({ "KEY": "VALUE" });
// });
app.use(router.get("/get_location_groups]", function (request, response, next) {
    const query = `
         SELECT DISTINCT location_group_id,
                         location_group
         FROM			oms.warehouse_recode
       ORDER BY		location_group ASC
     `;

    new Promise(function (resolve, reject) {
        setUpPool().query(query,
            function (error, results) {
                if (error) {
                    reject(error);
                }

                if (results.rows) {
                    response.send({ "WHAT": "OKAY" });
                }
            });
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
