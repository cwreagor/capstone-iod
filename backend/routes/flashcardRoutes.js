const express = require("express");
const router = express.Router();

const {
  saveFlashcard,
  getFlashcards,
  deleteFlashcard,
  updateFlashcard
} = require("../controllers/flashcardController");

router.post("/", saveFlashcard);
router.get("/:email/:subject", getFlashcards);
router.delete("/:id", deleteFlashcard);
router.put("/:id", updateFlashcard);

module.exports = router;