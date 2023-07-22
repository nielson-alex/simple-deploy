
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MONGODB_URI = 'mongodb+srv://agnielson:P4nd4n0sePris0ner24601@cluster0.notmgra.mongodb.net/test';
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 5001;
const deckRoutes = require("./server/routes/deck-routes");
const corsOptions = {
    origin: "*",
    methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization", "Accept", "Accept-Language", "X-Authorization"],
    optionsSuccessStatus: 200
};

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, "public")));
app.use((err, req, res, next) => {
    res.status(500).send(err);
});
app.use("/decks", deckRoutes);

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    family: 4
};

mongoose.connect(MONGODB_URI, options)
    .then(result => {
        const server = app.listen(PORT, () => {
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