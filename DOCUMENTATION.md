# 🧾 Documentation: Kanban Board (Detailed Code Review)

This document mirrors the tone and structure of the project's reviewer notes and provides a comprehensive, line-by-line explanation of the HTML, CSS, and JavaScript in this folder. It also contains a feature & function registry with inputs, outputs, logic, and interconnectivity details for each major function.

---

**Contents**

- [index.html](#indexhtml)
- [style.css](#stylecss)
- [script3.js](#script3js)
- [Feature & Function Registry](#feature--function-registry)

---

## index.html

### 🎯 Purpose Overview

`index.html` provides the structural skeleton for the Kanban board UI. It declares three columns (`To do`, `In Progress`, `Done`), a search input, a category filter, and an Add Tasks button. It links to `style.css` for presentation and `script3.js` for behavior.

---

### 🔎 Semantic Structure & ARIA Notes

| Element              | Role             | Notes                                                                             |
| -------------------- | ---------------- | --------------------------------------------------------------------------------- |
| `<html lang="en">`   | Root             | Language declared for accessibility and SEO                                       |
| `<head>`             | Metadata         | charset and viewport meta tags ensure correct rendering and mobile responsiveness |
| `<body>`             | Visible UI       | Holds UI within a `.container` wrapper                                            |
| `<h1>`               | Page title       | Main heading — one per page, SEO-friendly                                         |
| `<h2>`               | Column titles    | Inside each `.list` — follows semantic heading hierarchy                          |
| `<div class="list">` | Column container | Presentational; could add `role="list"` for assistive tech                        |
| `<div class="card">` | Task item        | Draggable; could add `role="listitem"`                                            |

**Recommended ARIA enhancement:**

```html
<div class="list" id="list1" role="list" aria-label="To do"></div>
<div class="card" draggable="true" id="card1" role="listitem">...</div>
```

---

### 🧱 Line-by-Line Breakdown

#### 1. Document Type Declaration

```html
<!DOCTYPE html>
```

- Ensures **standards mode** (HTML5). Without it, browsers enter "quirks mode" and may render inconsistently.

---

#### 2. Root Element

```html
<html lang="en"></html>
```

- **`lang="en"`** tells browsers and screen readers the page is in English.
- Improves accessibility (correct pronunciation) and SEO.

---

#### 3. Head Section

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kanban Board</title>
  <link rel="stylesheet" href="style.css" />
</head>
```

| Tag                          | Purpose                                             |
| ---------------------------- | --------------------------------------------------- |
| `<meta charset="UTF-8">`     | Supports all characters including emojis 📋         |
| `<meta name="viewport" ...>` | Mobile responsiveness — page scales to device width |
| `<title>`                    | Browser tab text & bookmark name                    |
| `<link rel="stylesheet">`    | Connects CSS for styling                            |

> **🔥 Exam Tip:** Without the viewport meta tag, mobile users see a tiny desktop version requiring horizontal scrolling!

---

#### 4. Search & Filter Container

```html
<div class="search-container">
  <input type="text" id="searchInput" placeholder="Search tasks..." />
  <select id="categoryFilter">
    <option value="all">All Categories</option>
    <option value="list1">To Do</option>
    <option value="list2">In Progress</option>
    <option value="list3">Done</option>
  </select>
</div>
```

- **`#searchInput`** — text input for filtering cards by task name.
- **`#categoryFilter`** — dropdown to filter by column. Values match list `id`s (`list1`, `list2`, `list3`).
- Both are referenced by `script3.js` for the `filterCards()` function.

---

#### 5. Board Structure

```html
<div class="board">
  <!-- LIST 1 -->
  <div class="list" id="list1">
    <h2>To do</h2>
    <div class="card" draggable="true" id="card1">
      <span class="card-text">Wash Dishes</span>
      <span class="delete-card-btn">&times;</span>
    </div>
    <div class="card" draggable="true" id="card2">
      <span class="card-text">Buy Groceries</span>
      <span class="delete-card-btn">&times;</span>
    </div>
  </div>
  <!-- LIST 2 -->
  <div class="list" id="list2">
    <h2>In Progress</h2>
    <div class="card" draggable="true" id="card3">
      <span class="card-text">Learn to Code</span>
      <span class="delete-card-btn">&times;</span>
    </div>
  </div>
  <!-- LIST 3 -->
  <div class="list" id="list3">
    <h2>Done</h2>
  </div>
</div>
```

| Element            | Attribute          | Purpose                                                 |
| ------------------ | ------------------ | ------------------------------------------------------- |
| `.board`           | —                  | Flexbox container for the 3 columns                     |
| `.list`            | `id="list1"` etc.  | Unique identifier for JS targeting & category filtering |
| `.card`            | `draggable="true"` | Enables HTML5 drag-and-drop                             |
| `.card`            | `id="card1"` etc.  | Unique ID stored in `dataTransfer` during drag          |
| `.card-text`       | —                  | Span holding task text (simplifies editing)             |
| `.delete-card-btn` | —                  | × button to remove the card                             |

> **🔥 Exam Tip:** `draggable="true"` enables native HTML5 drag-and-drop. Without it, the element cannot be dragged!

---

#### 6. Add Button

```html
<div class="addCard">
  <button id="AddCardButton">Add Tasks</button>
</div>
```

- Positioned absolutely (top-right via CSS).
- Click triggers `addNewCard()` in JavaScript.

---

#### 7. Script Tag

```html
<script src="script3.js"></script>
```

- Placed at the **end of `<body>`** so HTML elements exist before JS runs.
- Loads behavior: drag-and-drop, add/edit/delete, filtering, persistence.

---

## style.css

### 🎯 Purpose Overview

`style.css` defines layout, visual design, responsive behavior, and interactive affordances (hover, active states) for the Kanban board.

---

### 🧱 Line-by-Line Breakdown

#### 1. Universal Reset

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

| Property                 | Value                           | Why                      |
| ------------------------ | ------------------------------- | ------------------------ |
| `padding: 0`             | No inner spacing                | Removes browser defaults |
| `margin: 0`              | No outer spacing                | Removes browser defaults |
| `box-sizing: border-box` | Include padding/border in width | Makes sizing predictable |

**Understanding `box-sizing: border-box`:**

```
Without border-box:          With border-box:
┌─────────────────┐          ┌─────────────────┐
│    padding      │          │ content+padding │
│  ┌───────────┐  │          │   = 200px       │
│  │  content  │  │          └─────────────────┘
│  └───────────┘  │
│  = 200px + pad  │
└─────────────────┘
```

---

#### 2. Body Styling

```css
body {
  font-family: system-ui, sans-serif;
  background-image: linear-gradient(to bottom, white, #5e94e6);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

| Property                                 | Purpose                                    |
| ---------------------------------------- | ------------------------------------------ |
| `font-family: system-ui`                 | Uses the OS default font for a native look |
| `background-image: linear-gradient(...)` | White-to-blue gradient from top to bottom  |
| `display: flex`                          | Enables Flexbox centering                  |
| `justify-content: center`                | Horizontal centering                       |
| `align-items: center`                    | Vertical centering                         |
| `min-height: 100vh`                      | At least full viewport height              |

**Analogy:** Flexbox centering is like placing a picture frame **exactly in the center of a wall** automatically!

---

#### 3. Container

```css
.container {
  text-align: center;
  width: 100%;
  padding: 1.2rem;
  position: relative;
}
```

- `position: relative` allows the `.addCard` button to be positioned absolutely within.

---

#### 4. Board Layout (Flexbox)

```css
.board {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
}
```

| Property                        | Purpose                                   |
| ------------------------------- | ----------------------------------------- |
| `display: flex`                 | Items arranged in a row                   |
| `justify-content: space-around` | Equal space around each column            |
| `align-items: flex-start`       | Columns align at the top                  |
| `max-width: 1200px`             | Prevents excessive width on large screens |
| `gap: 20px`                     | 20px spacing between columns              |

**Understanding `space-around` vs `space-between`:**

```
space-around:                    space-between:
|  □  |  □  |  □  |             |□         □         □|
   ↑     ↑     ↑                 ↑                   ↑
Equal space around each         Space only between items
```

---

#### 5. List (Column) Styling

```css
.list {
  background-color: rgb(243, 243, 243);
  padding: 1rem;
  border-radius: 20px;
  width: 30%;
  min-height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

- **`width: 30%`** — three columns fit nicely inside the board.
- **`box-shadow`** — creates depth/elevated effect.

---

#### 6. Card Styling

```css
.card {
  background-color: white;
  color: #333;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 8px;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  position: relative;
}
```

| Property             | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| `cursor: grab`       | Shows open hand cursor ✋ (draggable hint)          |
| `transition`         | Smooth animations for transform/shadow changes      |
| `position: relative` | Allows absolute positioning of delete button inside |

---

#### 7. Card Active State (While Dragging)

```css
.card:active {
  cursor: grabbing;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(223, 45, 45, 0.952);
}
```

- **`cursor: grabbing`** — closed hand ✊ while dragging.
- **`transform: scale(1.1)`** — card grows 10% larger.
- **Red-tinted shadow** — visual feedback that card is "lifted".

---

#### 8. Delete Button

```css
.delete-card-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  background-color: #ff4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  transition:
    opacity 0.2s,
    transform 0.2s,
    background-color 0.2s;
}

.card:hover .delete-card-btn {
  opacity: 1;
}
```

- Hidden by default (`opacity: 0`), revealed on card hover.
- Circular red button with white × symbol.

---

#### 9. Drop Zone Indicator

```css
.list.over {
  background-color: #383535;
}
```

- Applied by JavaScript when dragging a card over a list.
- Dark background signals "this is a valid drop zone".

---

#### 10. Responsive Design

```css
@media (max-width: 770px) {
  .board {
    flex-direction: column;
    align-items: center;
  }
  .list {
    width: 80%;
    margin-bottom: 20px;
  }
}
```

- On screens ≤770px, columns **stack vertically** instead of side-by-side.

---

#### 11. Modal Panes (Add/Edit)

```css
#enterNamePane,
#editNamePane {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}
```

- **Centered modal** using `position: fixed` + `translate(-50%, -50%)`.
- **Purple gradient** background with slide-in animation.
- **`z-index: 1000`** ensures it appears above all other content.

---

## script3.js

### 🎯 Purpose Overview

`script3.js` implements:

1. **Drag-and-drop** between columns
2. **Create/delete/edit** card behaviors
3. **Persistent state** via `localStorage`
4. **Filtering** by search text and category

---

### 🧱 Line-by-Line Breakdown

#### 1. DOM Element Selection

```javascript
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("AddCardButton");
const deleteButton = document.getElementById("DeleteCardButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cardCounter = 0; // Counter for dynamically created cards
```

| Variable         | What it holds                                 |
| ---------------- | --------------------------------------------- |
| `cards`          | NodeList of all `.card` elements at load time |
| `lists`          | NodeList of all `.list` elements              |
| `addButton`      | Reference to the Add Tasks button             |
| `searchInput`    | Reference to the search text input            |
| `categoryFilter` | Reference to the category dropdown            |
| `cardCounter`    | Numeric suffix for generating unique card IDs |

> **Note:** `cards` is a static NodeList — dynamically created cards won't be in it. The code attaches listeners when creating new cards.

---

#### 2. `saveCards()` — Persist State

```javascript
function saveCards() {
  const data = [...document.querySelectorAll(".card")].map((card) => {
    const textSpan = card.querySelector(".card-text");
    const text = textSpan
      ? textSpan.textContent.trim()
      : card.textContent.replace("×", "").trim();
    return {
      id: card.id,
      text: text,
      listId: card.parentElement.id,
    };
  });
  localStorage.setItem("kanbanCards", JSON.stringify(data));
}
```

| Aspect                  | Detail                                               |
| ----------------------- | ---------------------------------------------------- |
| **Input**               | Current DOM `.card` elements                         |
| **Output**              | JSON array saved to `localStorage` key `kanbanCards` |
| **Logic**               | Collects `{ id, text, listId }` for each card        |
| **Why spread `[...]`?** | Converts NodeList to Array so `.map()` works         |

---

#### 3. `loadCards()` — Restore State

```javascript
function loadCards() {
  const data = JSON.parse(localStorage.getItem("kanbanCards") || "[]");
  document.querySelectorAll(".card").forEach((card) => card.remove());
  data.forEach(({ id, text, listId }) => {
    // Create card element with text span, delete button, event listeners
    // Append to correct list
    // Update cardCounter
  });
}
```

| Aspect         | Detail                                                                        |
| -------------- | ----------------------------------------------------------------------------- |
| **Input**      | JSON from `localStorage` (or empty array)                                     |
| **Output**     | Repopulates DOM with saved cards                                              |
| **Logic**      | Removes existing cards first to avoid duplicates, then recreates from storage |
| **Event Loop** | Called on `DOMContentLoaded`                                                  |

---

#### 4. `filterCards()` — Search & Category Filter

```javascript
function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const allCards = document.querySelectorAll(".card");

    allCards.forEach(card => {
        const textSpan = card.querySelector('.card-text');
        const cardText = textSpan ? textSpan.textContent.toLowerCase().trim() : ...;
        const cardCategory = card.parentElement.id;

        const matchesSearch = cardText.includes(searchTerm);
        const matchesCategory = selectedCategory === "all" || cardCategory === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}
```

| Aspect       | Detail                                               |
| ------------ | ---------------------------------------------------- |
| **Input**    | `searchInput.value`, `categoryFilter.value`          |
| **Output**   | Toggles `.hidden` class on cards                     |
| **Logic**    | Case-insensitive substring match + category equality |
| **CSS Link** | `.card.hidden { display: none; }`                    |

---

#### 5. `editCard(card)` — Edit Modal

```javascript
function editCard(card) {
    const editPane = document.createElement("div");
    editPane.id = "editNamePane";

    const textSpan = card.querySelector('.card-text');
    const currentText = textSpan ? textSpan.textContent.trim() : ...;

    editPane.innerHTML = `
        <label for="editCardInput">Edit Task Name:</label>
        <input type="text" id="editCardInput" value="${currentText}">
    `;
    document.body.appendChild(editPane);

    const editInput = document.getElementById("editCardInput");
    editInput.focus();
    editInput.select();

    editInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            textSpan.textContent = editInput.value.trim();
            saveCards();
            editPane.remove();
        } else if (event.key === "Escape") {
            editPane.remove();
        }
    });
}
```

| Aspect       | Detail                                              |
| ------------ | --------------------------------------------------- |
| **Input**    | DOM card element                                    |
| **Output**   | Creates modal; on save updates card text + persists |
| **Keyboard** | Enter = save, Escape = cancel                       |
| **CSS Link** | `#editNamePane` styles the modal                    |

---

#### 6. Drag-and-Drop Handlers

```javascript
function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}
```

- Stores the card's `id` in `dataTransfer` so `dragDrop` knows which card was dragged.

```javascript
function dragOver(e) {
  e.preventDefault();
}
```

- **Critical:** Without `preventDefault()`, dropping is not allowed!

```javascript
function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}
```

- Adds `.over` class → CSS darkens the list background.

```javascript
function dragLeave(e) {
  this.classList.remove("over");
}
```

- Removes visual feedback when dragged item leaves.

```javascript
function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
  saveCards();
}
```

- Retrieves card ID, moves card into this list, persists new state.

> **🔥 Exam Tip:** `dataTransfer` is the bridge between `dragStart` and `drop` — it carries data during the drag operation.

---

#### 7. `addNewCard()` — Add Modal

```javascript
function addNewCard() {
  const enterNamePane = document.createElement("div");
  enterNamePane.id = "enterNamePane";
  enterNamePane.innerHTML = `
        <label for="cardNameInput">Enter Task Name:</label>
        <input type="text" id="cardNameInput">
    `;
  document.body.appendChild(enterNamePane);

  const cardNameInput = document.getElementById("cardNameInput");
  cardNameInput.focus();

  cardNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const cardName = cardNameInput.value.trim();
      if (cardName !== "") {
        createActualCard(cardName);
        enterNamePane.remove();
      }
    }
  });
}
```

---

#### 8. `createActualCard(cardName)` — Build New Card

```javascript
function createActualCard(cardName) {
  cardCounter++;

  const newCard = document.createElement("div");
  newCard.className = "card";
  newCard.draggable = true;
  newCard.id = "card" + cardCounter;

  // Create text span
  const textSpan = document.createElement("span");
  textSpan.className = "card-text";
  textSpan.textContent = cardName.trim();
  newCard.appendChild(textSpan);

  // Create delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-card-btn";
  deleteBtn.innerHTML = "X";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    newCard.remove();
    saveCards();
  });
  newCard.appendChild(deleteBtn);

  // Attach drag and edit listeners
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragend", dragEnd);
  newCard.addEventListener("click", function (e) {
    if (!e.target.classList.contains("delete-card-btn")) {
      editCard(newCard);
    }
  });

  document.getElementById("list1").appendChild(newCard);
  saveCards();
}
```

| Aspect     | Detail                                               |
| ---------- | ---------------------------------------------------- |
| **Input**  | String `cardName`                                    |
| **Output** | New `.card` appended to "To Do" column               |
| **State**  | Increments `cardCounter`, persists via `saveCards()` |

---

#### 9. Initialization

```javascript
window.addEventListener("DOMContentLoaded", loadCards);
```

- On page load, restores cards from `localStorage`.

---

## Feature & Function Registry

| Function                     | Input                                       | Output                           | Logic                                          | Interconnectivity                                   |
| ---------------------------- | ------------------------------------------- | -------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| `saveCards()`                | DOM `.card` elements                        | `localStorage` JSON              | Serializes `{ id, text, listId }` per card     | Called after any mutation (create/edit/delete/drop) |
| `loadCards()`                | `localStorage` JSON                         | DOM cards                        | Removes existing cards, recreates from storage | Called on `DOMContentLoaded`                        |
| `filterCards()`              | `searchInput.value`, `categoryFilter.value` | Toggles `.hidden` class          | Case-insensitive substring + category match    | Bound to `input` and `change` events                |
| `editCard(card)`             | DOM card element                            | Modal UI; updates card text      | Creates `#editNamePane`, handles Enter/Escape  | Invoked on card click (not delete button)           |
| `dragStart(e)`               | Drag event                                  | Stores card ID in `dataTransfer` | `setData("text/plain", this.id)`               | Pairs with `dragDrop`                               |
| `dragOver(e)`                | Dragover event                              | Allows drop                      | `e.preventDefault()`                           | Required to enable `drop` event                     |
| `dragEnter(e)`               | Dragenter event                             | Adds `.over` class               | Visual drop zone feedback                      | CSS: `.list.over`                                   |
| `dragLeave(e)`               | Dragleave event                             | Removes `.over` class            | Cleans up visual feedback                      | CSS: `.list.over`                                   |
| `dragDrop(e)`                | Drop event                                  | Moves card, persists             | `appendChild(card)`, `saveCards()`             | Final step of drag-and-drop                         |
| `addNewCard()`               | Button click                                | Modal UI                         | Creates `#enterNamePane`                       | Calls `createActualCard()` on Enter                 |
| `createActualCard(cardName)` | String                                      | New `.card` in DOM               | Builds element, attaches listeners, persists   | CSS: `.card`, `.delete-card-btn`                    |

---

## 🔗 File Interconnections

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                            │
│                    (The Structure)                           │
└─────────────────────────────────────────────────────────────┘
                │                           │
                │ <link>                    │ <script>
                ▼                           ▼
┌───────────────────────────┐   ┌────────────────────────────┐
│       style.css           │   │        script3.js          │
│   (The Appearance)        │   │     (The Behavior)         │
└───────────────────────────┘   └────────────────────────────┘
```

| Connection | Mechanism                                                 |
| ---------- | --------------------------------------------------------- |
| HTML → CSS | `<link>` tag + `class`/`id` selectors                     |
| HTML → JS  | `<script>` tag + `id`/`class` for `querySelector`         |
| JS → CSS   | Adds/removes classes (`.over`, `.hidden`) that CSS styles |
| JS → HTML  | Creates elements, modifies `textContent`, appends to DOM  |

---

## ✅ Key Takeaways

1. **`draggable="true"`** enables HTML5 drag-and-drop on cards
2. **`e.preventDefault()`** in `dragover` is required to allow dropping
3. **`dataTransfer`** carries the card ID from drag start to drop
4. **`localStorage`** provides persistence across page refreshes
5. **Flexbox** (`display: flex`) creates the 3-column layout
6. **Media queries** make the board responsive on mobile
7. **Script at bottom** ensures DOM exists before JS runs
8. **`classList.add/remove`** toggles CSS classes for visual feedback

---

## 📝 Recommendations

- **Accessibility:** Add `role="list"` on `.list` and `role="listitem"` on `.card`
- **Security:** Avoid `innerHTML` with user input; prefer `textContent` and `createElement`
- **UX:** Consider confirmation dialogs for delete actions
- **State:** Persist `cardCounter` separately to avoid ID collisions after external edits
