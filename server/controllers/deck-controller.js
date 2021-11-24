const mongoose = require("mongoose");
const Deck = require("../models/Decks");

/* GET */
exports.getAllDecks = function (request, response, next) {
    const page = request.query.page;
    let totalItems;

    // Deck.find({ creator: "Alex Nielson" })
    Deck.find()
        .countDocuments()
        .then(numProducts => {
            totalItems = numProducts;
            return Deck.find();
        })
        .then(decks => {
            console.log("decks:", decks);
            response.send({ "decks": decks });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getCardsByDeckId = (req, res, next) => {
    const deckId = req.params._id;
    console.log("deckId:", deckId);

    Deck.findById(new mongoose.Types.ObjectId(deckId))
        .then(deck => {
            res.send({ "data": deck });
        });
}

/* POST */
exports.postAddDeck = function (request, response, next) {
    const creator = request.body.creator;
    const deck_name = request.body.deck_name;
    const cards = request.body.cards;

    console.log("creator:", creator);
    console.log("deck_name:", deck_name);
    console.log("cards:", cards);

    let errorMessage = "";

    if (creator === ""
        || deck_name === ""
        || cards.length < 1
    ) {
        if (creator === "") {
            errorMessage = "Creator name must be included";
        } else if (deck_name === "") {
            errorMessage = "Deck name must be included";
        } else if (cards.length < 1) {
            errorMessage = "Deck must have at least one card";
        }

        response.send({ "status": "New entry successfully added" });
    } else {
        const deck = new Deck({
            creator: creator,
            deck_name: deck_name,
            cards: cards
        });

        deck.save()
            .then(result => {
                console.log('Created entry');
                response.send({ "status": "New entry successfully added" });
            })
            .catch(err => {
                console.log(err);

                response.send({ "status": "Error" });
            });
    }
}