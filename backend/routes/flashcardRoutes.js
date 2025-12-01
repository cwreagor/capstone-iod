const express = require("express");
const router = express.Router();

const {
  saveFlashcard,
  getFlashcards,
  deleteFlashcard
} = require("../controllers/flashcardController");

router.post("/", saveFlashcard);

router.get("/:email/:subject", getFlashcards);

router.delete("/:email/:subject/:index", deleteFlashcard);

module.exports = router;