const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    subject: { type: String, required: true },
    front: { type: String, required: true },
    back: { type: String, required: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model("Flashcard", FlashcardSchema);