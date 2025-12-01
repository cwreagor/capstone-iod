import React, { useState, useEffect } from "react";
import Flashcard from "../components/Flashcard";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../controllers/AuthContext";

const API_URL = "http://localhost:5001";

export default function FlashcardList({ subject, initialCards = [] }) {
  const { user } = useAuth();

  const [cards, setCards] = useState([]);
  const [showGuestMessage, setShowGuestMessage] = useState(false);

  async function loadCards() {
    if (!user) {
      setCards(initialCards);
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/flashcards/${user.email}/${subject}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const saved = await res.json();

      setCards([...(initialCards || []), ...saved]);
    } catch (err) {
      console.error("Error loading flashcards:", err);
    }
  }

  useEffect(() => {
    loadCards();
  }, [user, subject, initialCards]);

  const addCard = async (e) => {
    e.preventDefault();
    const front = e.target.front.value.trim();
    const back = e.target.back.value.trim();
    if (!front || !back) return;

    const newCard = { front, back };

    if (!user) {
      setCards((prev) => [...prev, newCard]);
      setShowGuestMessage(true);
      e.target.reset();
      return;
    }

    try {
      await fetch(`${API_URL}/flashcards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.email,
          subject,
          front,
          back,
        }),
      });

      await loadCards();

    } catch (err) {
      console.error("Error saving flashcard:", err);
    }

    e.target.reset();
  };

  const deleteCard = async (index) => {
    const builtInCount = initialCards.length;

    if (index < builtInCount) {
      alert("Default flashcards cannot be deleted.");
      return;
    }

    if (!user) {
      const updated = [...cards];
      updated.splice(index, 1);
      setCards(updated);
      return;
    }

    try {
      const userIndex = index - builtInCount;

      await fetch(`${API_URL}/flashcards/${user.email}/${subject}/${userIndex}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      loadCards();
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  return (
    <div className="flashcard-container">

      {cards.map((card, index) => (
        <Flashcard
          key={index}
          front={card.front}
          back={card.back}
          onDelete={() => deleteCard(index)}
        />
      ))}

      {showGuestMessage && !user && (
        <div className="guest-warning">
          <p style={{ fontWeight: "bold", color: "white", marginTop: "10px" }}>
            Log in to save your flashcards!
          </p>
        </div>
      )}

      <Form onSubmit={addCard} className="add-form">
        <Form.Group>
          <Form.Control name="front" type="text" placeholder="Front text" />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Control name="back" type="text" placeholder="Back text" />
        </Form.Group>

        <Button type="submit" className="mt-3" variant="success">
          Add Flashcard
        </Button>
      </Form>
    </div>
  );
}
