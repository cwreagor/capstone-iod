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
  try {
    await Flashcard.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Flashcard deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function updateFlashcard(req, res) {
  try {
    const { front, back } = req.body;

    const updated = await Flashcard.findByIdAndUpdate(
      req.params.id,
      { front, back },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  saveFlashcard,
  getFlashcards,
  deleteFlashcard,
  updateFlashcard
};