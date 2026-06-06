# Snake Game

A browser-based Snake Game built using **HTML, CSS, and Vanilla JavaScript**. The project recreates the classic Snake experience with dynamic grid generation, collision detection, random food spawning, score tracking, timer functionality, and persistent high-score storage using Local Storage.

---

## Live Demo

Coming Soon

---

## Project Overview

This project was built to strengthen my understanding of JavaScript fundamentals by implementing a complete game without using any external libraries or frameworks.

The game includes:

* Dynamic board generation
* Continuous snake movement
* Keyboard-based controls
* Food spawning logic
* Snake growth mechanics
* Wall collision detection
* Self-collision detection
* Score tracking
* Game timer
* High-score persistence using Local Storage
* Game restart functionality

---

## Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6)
* Browser Local Storage API

---

## Controls

⬆️ Arrow Up    - Move Up,
⬇️ Arrow Down  - Move Down,
⬅️ Arrow Left  - Move Left,
➡️ Arrow Right - Move Right

---

## Key Concepts Practiced

While building this project, I worked extensively with:

* DOM Manipulation
* Event Handling
* Dynamic Element Creation
* JavaScript Timers (`setInterval`)
* State Management
* Collision Detection
* Array Operations
* Local Storage
* Game Loop Logic
* Conditional Rendering

---

## Technical Implementation

### Dynamic Grid Generation

Instead of manually creating cells in HTML, the game board is generated dynamically based on the board dimensions.

This approach makes the grid scalable and keeps the HTML structure clean.

### Snake State Management

The snake is represented as an array of coordinate objects.

```js
[
  { x: 5, y: 8 },
  { x: 5, y: 9 },
  { x: 5, y: 10 }
]
```

Each game tick updates the head position while maintaining the body structure.

### Collision Detection

The game continuously checks for:

* Wall collisions
* Self-collisions

When either condition is met, the game loop is stopped and the game-over screen is displayed.

### Food Generation Logic

Food is generated randomly across the board while ensuring it never spawns on an existing snake segment.

### Persistent High Score

High scores are stored using Local Storage so that scores remain available even after refreshing or reopening the browser.

---

## Challenges Faced

### 1. Preventing Food from Spawning Inside the Snake

One of the biggest challenges was ensuring food never appeared on top of the snake's body.

To solve this, I implemented a validation loop that repeatedly generates random coordinates until a position is found that is not occupied by any snake segment.

### 2. Handling Reverse Direction Movement

Without restrictions, players could instantly move in the opposite direction and collide with themselves.

I added direction checks to prevent invalid movement such as:

* Left → Right
* Right → Left
* Up → Down
* Down → Up

### 3. Managing Multiple Timers

The game uses separate intervals for:

* Snake movement
* Game timer

Proper cleanup was necessary to avoid duplicate intervals when restarting the game.

### 4. Implementing Accurate Self-Collision Detection

Detecting collisions with the snake's own body required checking every new head position against all existing snake segments before rendering the next frame.

### 5. Keeping Game State Consistent During Restart

Restarting the game required resetting:

* Snake position
* Food position
* Score
* Timer
* UI state
* Running intervals

without affecting the stored high score.

---

## What I Learned

Through this project I gained practical experience with:

* Structuring JavaScript applications
* Managing game state
* Working with browser storage
* Building timer-driven applications
* Solving coordinate-based logic problems
* Writing reusable functions
* Debugging real-time interactive systems

---

## Project Structure

```text
snake-game/
│
├── Screenshots/
│   ├── Game Over Screen.png
│   ├── Game Screen.png
│   ├── Welcome Screen.png
│    
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## Potential Future Enhancements

* Mobile touch/swipe controls
* Responsive game board
* Difficulty levels
* Pause / Resume functionality
* Sound effects
* Leaderboard system
* Power-ups and obstacles

---

## Author

Hritik Srivastava

GitHub: https://github.com/Arpit9320
