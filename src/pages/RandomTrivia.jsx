import React, { useEffect, useState } from "react";
import FlashcardList from "../controllers/FlashcardList";

export default function Trivia() {
  const [card, setCard] = useState(null);

  async function loadTrivia() {
    try {
      const res = await fetch("https://the-trivia-api.com/v2/questions?limit=1");
      const data = await res.json();

      const item = data[0];

      if (!item) {
        setCard({
          front: "Trivia Unavailable",
          back: "The Trivia API returned no question."
        });
        return;
      }

      const question = item.question?.text || "No question found";
      const answer = item.correctAnswer || "No answer found";

      setCard({
        front: question,
        back: answer
      });

    } catch (error) {
      setCard({
        front: "Trivia API Error",
        back: "Unable to load trivia question."
      });
    }
  }

  useEffect(() => {
    loadTrivia();
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Random Trivia</h1>

      {card && (
        <FlashcardList 
          subject="trivia"
          initialCards={[card]}
        />
      )}
    </div>
  );
}