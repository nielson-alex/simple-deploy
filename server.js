
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const csrf = require("csurf");
const flash = require("connect-flash");
const MONGODB_URI = 'mongodb+srv://NewEggHome:a@cluster0.ysadg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PORT = process.env.PORT || 5001;
const request = require("request");
const router = express.Router();
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const animalRoutes = require("./server/routes/animal-routes");
const authRoutes = require("./server/routes/auth-routes");
const deckRoutes = require("./server/routes/deck-routes");
const environmentTestingRoutes = require("./server/routes/environment-testing-routes");
const resumeRoutes = require("./server/routes/resume-routes");
const User = require("./server/models/users");

let path2 = path.join(__dirname, "/server/routes");
console.log("express.static(\"routes\"):", path2);

// Automatically creates cookie for you
// const csrfProtection = csrf({ cookie: true });
const csrfProtection = csrf();

const corsOptions = {
    // origin: "https://date-planning-app.herokuapp.com/",
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization", "Accept", "Accept-Language", "X-Authorization"],
    optionsSuccessStatus: 200
};

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use(flash());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
app.use((err, req, res, next) => {
    res.status(500).send(err);
});
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.get('/', csrfProtection, function (req, res) {
    // pass the csrfToken to the view
    // res.render('send', { csrfToken: req.csrfToken() })
    console.log("req.csrfToken():", req.csrfToken());
    res.send({ csrfToken: req.csrfToken() })
})
app.use("/animals", animalRoutes);
app.use("/auth", authRoutes);
app.use("/decks", deckRoutes);
app.use("/environment_testing", environmentTestingRoutes);
app.use("/resume", resumeRoutes);


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