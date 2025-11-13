import React from "react";
import FlashcardList from "../components/FlashcardList";

const literatureCards = [
  { front: "Which famous playwright wrote Romeo and Juliet?", back: "William Shakespeare" },
  { front: "In ‘Nineteen Eighty-Four’, what figure watches everyone?", back: "Big Brother" },
  { front: "In Homer’s ‘Odyssey’, what is the name of the Cyclops?", back: "Polyphemus" },
  { front: "Who wrote ‘Fahrenheit 451?’", back: "Ray Bradbury" },
  { front: "From which of Shakespeare’s plays comes the line, ‘To be or not to be’?", back: "Hamlet" },
];

export default function Literature() {
  return (
    <div className="page-container">
      <h1 className="page-title">Literature</h1>
      <FlashcardList initialCards={literatureCards} />
    </div>
  );
}