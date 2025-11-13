import React from "react";
import FlashcardList from "../components/FlashcardList";

const scienceCards = [
  { front: "What is the giant storm on Jupiter called?", back: "The Great Red Spot" },
  { front: "Which two planets have no moons?", back: "Mercury & Venus" },
  { front: "Which element gives Mars its reddish color?", back: "Iron (oxide)" },
  { front: "Which planet is closest in size to Earth?", back: "Venus" },
  { front: "Which planet has the most moons?", back: "Jupiter (97 moons)" },
];

export default function Science() {
  return (
    <div className="page-container">
      <h1 className="page-title">Science</h1>
      <FlashcardList initialCards={scienceCards} />
    </div>
  );
}