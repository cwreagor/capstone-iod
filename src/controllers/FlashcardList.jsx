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
    // LOGGED OUT → use default cards for ALL subjects
    if (!user) {
      setCards(initialCards);
      return;
    }

    // LOGGED IN → fetch user-saved cards
    try {
      const res = await fetch(
        `${API_URL}/flashcards/${user.email}/${subject}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const saved = await res.json();

      // ⭐ SPECIAL CASE: TRIVIA PAGE
      if (subject.toLowerCase() === "trivia") {
        // KEEP trivia default card + show saved trivia cards
        setCards([...(initialCards || []), ...saved]);
      } else {
        // ⭐ ALL OTHER SUBJECTS — DEFAULT CARDS REMOVED
        setCards(saved);
      }

    } catch (err) {
      console.error("Error loading flashcards:", err);
    }
  }

  useEffect(() => {
    loadCards();
  }, [user, subject, initialCards]);


  // ADD CARD
  const addCard = async (e) => {
    e.preventDefault();
    const front = e.target.front.value.trim();
    const back = e.target.back.value.trim();
    if (!front || !back) return;

    // LOGGED OUT → local only
    if (!user) {
      setCards((prev) => [...prev, { front, back }]);
      setShowGuestMessage(true);
      e.target.reset();
      return;
    }

    // LOGGED IN
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

      loadCards();
    } catch (err) {
      console.error("Error saving flashcard:", err);
    }

    e.target.reset();
  };


  // DELETE CARD
  const deleteCard = async (id, index) => {
    const builtInCount = initialCards.length;

    // BLOCK DELETION OF DEFAULT CARD — ONLY ON TRIVIA
    if (subject.toLowerCase() === "trivia" && index < builtInCount) {
      alert("Default trivia card cannot be deleted.");
      return;
    }

    // LOGGED OUT → delete locally
    if (!user) {
      const updated = [...cards];
      updated.splice(index, 1);
      setCards(updated);
      return;
    }

    // LOGGED IN → delete DB card
    try {
      await fetch(`${API_URL}/flashcards/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });

      loadCards();
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };


  // EDIT CARD
  const editCard = async (id, index) => {
    const builtInCount = initialCards.length;

    // BLOCK EDITING DEFAULT TRIVIA CARD
    if (subject.toLowerCase() === "trivia" && index < builtInCount) {
      alert("Default trivia card cannot be edited.");
      return;
    }

    const newFront = prompt("Enter new front text:");
    const newBack = prompt("Enter new back text:");
    if (!newFront || !newBack) return;

    try {
      await fetch(`${API_URL}/flashcards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ front: newFront, back: newBack }),
      });

      loadCards();
    } catch (err) {
      console.error("Error editing flashcard:", err);
    }
  };


  return (
    <div className="flashcard-container">
      {cards.map((card, index) => (
        <Flashcard
          key={index}
          front={card.front}
          back={card.back}
          onDelete={() => deleteCard(card._id || card.id, index)}
          onEdit={() => editCard(card._id || card.id, index)}
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