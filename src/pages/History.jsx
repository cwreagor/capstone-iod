import FlashcardList from "../controllers/FlashcardList";

const historyCards = [
  { front: "What year did World War I start?", back: "1914" },
  { front: "Who was the first person to walk on the moon?", back: "Neil Armstrong" },
  { front: "What year did the Berlin Wall fall?", back: "1989" },
  { front: "Who was the first living creature to orbit the Earth?", back: "Laika the dog" },
  { front: "What year did France stop using the guillotine?", back: "1981 (abolition of death penalty)" },
];

export default function History() {
  return (
    <div className="page-container">
      <h1 className="page-title">History</h1>
      <FlashcardList subject="history" initialCards={historyCards} />
    </div>
  );
}