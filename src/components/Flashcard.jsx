import React, { useState } from "react";

export default function Flashcard({ front, back, onDelete }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-wrapper">
      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className="front">{front}</div>
        <div className="back">{back}</div>
      </div>

      <button className="delete-btn" onClick={onDelete}>
        ✖
      </button>
    </div>
  );
}