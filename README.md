### Study Zone — Interactive Flashcard Learning App

Study Zone is a React-based flashcard application where users can create an account, log in, and study material across multiple subjects. It includes built-in flashcards for Science, Mythology, History, Math, Literature, plus a Random Trivia page.
Users can also create their own flashcards on every subject page.

### Features
### User Authentication

Sign Up with email + password validation

Login with lockout after 3 failed attempts

Logout button in the navigation menu

Sessions persist using LocalStorage

### Flashcards

Subject pages each include a set of flashcards

Cards flip to reveal answers

Users can create their own custom flashcards

Custom cards persist with LocalStorage

### Subjects Included

Science

Mythology

History

Math

Literature

Random Trivia

### UI & Experience

Mobile-friendly hamburger navigation bar

GIF logo in the navbar linking back to Home

Sticky navbar

Simple, clean interface

### Tech Stack

React – Frontend framework

React Router – Page navigation

LocalStorage – Save accounts + custom flashcards

AuthContext – Handles signup, login, logout

CSS – Custom styling

### Getting Started
1. Install dependencies
### npm install

2. Start the development server
### npm start


Visit your app at:

### http://localhost:3000

### Project Structure
src/
  components/
    Flashcard.jsx
    FlashcardList.jsx
    Footer.jsx
    NavBar.jsx
  pages/
    Home.jsx
    Login.jsx
    SignUp.jsx
    Science.jsx
    Mythology.jsx
    History.jsx
    Mathematics.jsx
    Literature.jsx
    RandomTrivia.jsx
  context/
    AuthContext.jsx
  assets/
    studyzone.gif
  App.jsx
  index.jsx
  style.css

### Authentication Overview

Accounts are saved in localStorage.users

Logging in checks email + password

Logged in user stored in localStorage.loggedInUser

NavBar updates to show Logout when logged in

User stays logged in on page refresh

### Flashcard System

Every subject page allows users to:

View a list of built-in flashcards

Flip cards for answers

Create new custom flashcards

Store these custom cards in LocalStorage

Render all cards dynamically

### Future Improvements

Dark mode

Ability to delete custom flashcards

Cloud storage for user accounts + flashcards

User profiles with progress tracking

Search function for flashcards

### License

This project is for educational purposes only.