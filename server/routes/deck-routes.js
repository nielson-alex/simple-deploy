const express = require("express");
const deckController = require("../controllers/deck-controller");
const router = express.Router();

/* GET */
router.get("/get_all_decks", deckController.getAllDecks);
router.get('/get_cards_by_deck_id/:_id', deckController.getCardsByDeckId);

/* POST */
router.post("/add_deck", deckController.postAddDeck);
router.post("/edit_deck", deckController.postEditDeck);

module.exports = router;