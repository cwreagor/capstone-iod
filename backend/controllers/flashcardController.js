const Flashcard = require("../models/Flashcard");

async function saveFlashcard(req, res) {
  const { userId, subject, front, back } = req.body;

  try {
    const card = await Flashcard.create({ userId, subject, front, back });
    res.status(200).json(card);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function getFlashcards(req, res) {
  const { email, subject } = req.params;

  try {
    const cards = await Flashcard.find({ userId: email, subject });
    res.status(200).json(cards);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function deleteFlashcard(req, res) {
  const { email, subject, index } = req.params;

  try {
    const cards = await Flashcard.find({ userId: email, subject });

    if (index < 0 || index >= cards.length) {
      return res.status(400).json({ error: "Invalid index" });
    }

    await Flashcard.findByIdAndDelete(cards[index]._id);

    res.status(200).json({ message: "Deleted" });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { saveFlashcard, getFlashcards, deleteFlashcard };