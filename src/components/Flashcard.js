import React, { useState } from "react";

export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={`flashcard ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)}>
      <div className="front">{front}</div>
      <div className="back">{back}</div>
    </div>
  );
}