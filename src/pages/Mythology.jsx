import React from "react";
import FlashcardList from "../controllers/FlashcardList";

const mythologyCards = [
  { front: "Who is the King of the Gods?", back: "Zeus" },
  { front: "Who guards the gates of the Underworld?", back: "Cerberus" },
  { front: "Who is the Goddess of Wisdom?", back: "Athena" },
  { front: "Which Gorgon could turn people to stone?", back: "Medusa" },
  { front: "Where do the Greek gods live?", back: "Mount Olympus" },
];

export default function Mythology() {
  return (
    <div className="page-container">
      <h1 className="page-title">Mythology</h1>
      <FlashcardList subject="mythology" initialCards={mythologyCards} />
    </div>
  );
}