import React, { useEffect, useState } from "react";
import FlashcardList from "../components/FlashcardList";

export default function Trivia() {
  const [card, setCard] = useState(null);

  function decodeHTML(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&type=multiple")
      .then(res => res.json())
      .then(data => {
        const item = data.results[0];

        const newCard = {
          front: decodeHTML(item.question),
          back: decodeHTML(item.correct_answer)
        };

        setCard(newCard);
      })
      .catch(() => {
        setCard({
          front: "API Error",
          back: "Unable to load trivia question."
        });
      });
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Random Trivia</h1>
      {card && <FlashcardList initialCards={[card]} />}
    </div>
  );
}