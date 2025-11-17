import React from "react";
import FlashcardList from "../components/FlashcardList";

const mathematicsCards = [
  { front: "What is the Pythagorean theorem?", back: "a^2 * b^2 = c^2" },
  { front: "Who invented calculus?", back: "Isaac Newton" },
  { front: "What is the square root of 144?", back: "12" },
  { front: "What is an equilateral triangle?", back: "A triangle with all three sides of equal length" },
  { front: "What shape has 10 sides?", back: "Decagon" },
];

export default function Mathematics() {
  return (
    <div className="page-container">
      <h1 className="page-title">Math</h1>
      <FlashcardList initialCards={mathematicsCards} />
    </div>
  );
}