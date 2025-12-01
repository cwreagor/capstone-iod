import React from "react";
import flashcardsImg from "../assets/flashcards.jpg";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to Study Zone</h1>

            <p>Select a topic from the menu to begin studying!</p>

      <img 
        src={flashcardsImg} 
        alt="Flashcards" 
        className="home-image"
      />

    </div>
  );
}