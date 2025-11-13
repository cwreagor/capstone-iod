import React, { useState } from "react";
import Flashcard from "./Flashcard";
import { Form, Button } from "react-bootstrap";

export default function FlashcardList({ initialCards }) {
  const [cards, setCards] = useState(initialCards);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const addCard = (e) => {
    e.preventDefault();
    if (!front.trim() || !back.trim()) return;
    setCards([...cards, { front, back }]);
    setFront("");
    setBack("");
  };

  return (
    <div className="flashcard-container">
      {cards.map((card, index) => (
        <Flashcard key={index} front={card.front} back={card.back} />
      ))}

      <Form onSubmit={addCard} className="add-form">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Front text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            placeholder="Back text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-3" variant="success">Add Flashcard</Button>
      </Form>
    </div>
  );
}