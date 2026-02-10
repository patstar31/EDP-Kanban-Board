# 🧠 JavaScript Reviewer: Kanban Board

## 🎯 What Is This Program About?

### Overview

This is a **Kanban Board** — a visual project management tool where tasks (cards) can be dragged between columns representing different stages of work. Users can:

1. **Drag** task cards from one column to another
2. **Drop** cards into "To Do", "In Progress", or "Done" columns
3. **See visual feedback** when dragging over a drop zone

### Real-World Use Cases

- **Project managers** tracking team tasks
- **Software developers** managing feature progress
- **Students** organizing homework and assignments
- **Anyone** wanting to visualize their workflow

### What Makes This Different from the Color Palette Generator?

| Color Palette           | Kanban Board                   |
| ----------------------- | ------------------------------ |
| Click-based interaction | Drag-and-drop interaction      |
| Generates random data   | Moves existing data            |
| Uses Clipboard API      | Uses Drag & Drop API           |
| Single action (click)   | Multi-step action (drag, drop) |

---

## 🖥️ Expected Outputs & User Flow

### Initial State (Page Load)

```
┌─────────────────────────────────────────────────────┐
│                   Kanban Board                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   To Do     │  │ In Progress │  │    Done     │ │
│  │─────────────│  │─────────────│  │─────────────│ │
│  │┌───────────┐│  │┌───────────┐│  │             │ │
│  ││Wash Dishes││  ││Learn Code ││  │             │ │
│  │└───────────┘│  │└───────────┘│  │             │ │
│  │┌───────────┐│  │             │  │             │ │
│  ││Buy Grocer.││  │             │  │             │ │
│  │└───────────┘│  │             │  │             │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘
```

### User Starts Dragging a Card

```
┌─────────────────────────────────────────────────────┐
│                   Kanban Board                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   To Do     │  │ In Progress │  │    Done     │ │
│  │─────────────│  │─────────────│  │─────────────│ │
│  │             │  │┌───────────┐│  │             │ │
│  │┌───────────┐│  ││Learn Code ││  │             │ │
│  ││Buy Grocer.││  │└───────────┘│  │             │ │
│  │└───────────┘│  │             │  │             │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
│                                                      │
│      ┌─────────────┐  ← Card being dragged!         │
│      │ Wash Dishes │     (scaled up 110%)           │
│      │   ✊ cursor  │     (stronger shadow)          │
│      └─────────────┘                                 │
└─────────────────────────────────────────────────────┘
```

### Dragging Over "Done" Column

```
┌─────────────────────────────────────────────────────┐
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   To Do     │  │ In Progress │  │    Done     │ │
│  │─────────────│  │─────────────│  │─────────────│ │
│  │             │  │┌───────────┐│  │█████████████│ │
│  │┌───────────┐│  ││Learn Code ││  │█████████████│ │
│  ││Buy Grocer.││  │└───────────┘│  │█ DARK GRAY █│ │
│  │└───────────┘│  │             │  │█ (drop zone)█│ │
│  └─────────────┘  └─────────────┘  │█████████████│ │
│                                     └─────────────┘ │
│      ┌─────────────┐                                │
│      │ Wash Dishes │  ← Still dragging              │
│      └─────────────┘                                │
└─────────────────────────────────────────────────────┘

The "Done" column turns dark (#333) to show it's a valid drop zone!
```

### After Dropping the Card

```
┌─────────────────────────────────────────────────────┐
│                   Kanban Board                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   To Do     │  │ In Progress │  │    Done     │ │
│  │─────────────│  │─────────────│  │─────────────│ │
│  │┌───────────┐│  │┌───────────┐│  │┌───────────┐│ │
│  ││Buy Grocer.││  ││Learn Code ││  ││Wash Dishes││ │
│  │└───────────┘│  │└───────────┘│  │└───────────┘│ │
│  │             │  │             │  │             │ │
│  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────┘

Card moved from "To Do" to "Done"! ✅
Console logs: "Drag ended"
```

---

## 🧱 Syntax Breakdown: Every Line Explained

### 1. Selecting DOM Elements

```javascript
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
```

**What it is:** Getting references to ALL cards and ALL lists on the page.

**Breaking it down:**

| Code                        | What it does                              |
| --------------------------- | ----------------------------------------- |
| `const`                     | Declares a constant (can't be reassigned) |
| `document`                  | The entire HTML page as an object         |
| `querySelectorAll(".card")` | Finds ALL elements with `class="card"`    |
| `querySelectorAll(".list")` | Finds ALL elements with `class="list"`    |

**Returns:** A **NodeList** (array-like collection of elements)

- `cards` = [card1, card2, card3]
- `lists` = [list1, list2, list3]

**Why `querySelectorAll` instead of `querySelector`?**

- `querySelector` → Returns ONE element (first match)
- `querySelectorAll` → Returns ALL matching elements

**Analogy:** Like asking "Give me ALL the sticky notes" vs "Give me A sticky note."

> **🔥 Exam Tip:** `querySelectorAll` returns a NodeList, not a true Array. You can use `for...of` or `forEach` to loop through it.

---

### 2. Adding Event Listeners to Cards (for...of loop)

```javascript
for (const card of cards) {
  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);
}
```

**What it is:** Loops through each card and attaches drag event listeners.

**Understanding `for...of`:**

```javascript
// These are equivalent:
for (const card of cards) {
  // for...of (modern, cleaner)
  // do something with card
}

for (let i = 0; i < cards.length; i++) {
  // traditional for loop
  const card = cards[i];
  // do something with card
}

cards.forEach((card) => {
  // forEach method
  // do something with card
});
```

**Events being listened for:**

| Event       | When it fires        | Purpose           |
| ----------- | -------------------- | ----------------- |
| `dragstart` | User STARTS dragging | Store card's ID   |
| `dragend`   | User STOPS dragging  | Cleanup (logging) |

**Why NO parentheses on function names?**

```javascript
card.addEventListener("dragstart", dragStart); // ✅ Pass the function
card.addEventListener("dragstart", dragStart()); // ❌ Call it NOW
```

**Analogy:** You're giving each sticky note **instructions**: "When someone picks you up, do THIS. When they put you down, do THAT."

---

### 3. Adding Event Listeners to Lists

```javascript
for (const list of lists) {
  list.addEventListener("dragover", dragOver);
  list.addEventListener("dragenter", dragEnter);
  list.addEventListener("dragleave", dragLeave);
  list.addEventListener("drop", dragDrop);
}
```

**What it is:** Loops through each list column and attaches drop zone event listeners.

**Events being listened for:**

| Event       | When it fires                   | Purpose                           |
| ----------- | ------------------------------- | --------------------------------- |
| `dragover`  | Something is being dragged over | Prevent default (allow drop)      |
| `dragenter` | Dragged item ENTERS the zone    | Visual feedback (dark background) |
| `dragleave` | Dragged item LEAVES the zone    | Remove visual feedback            |
| `drop`      | Item is DROPPED here            | Move the card to this list        |

**Analogy:** Each column is like a **landing pad** with sensors: "Alert me when something enters, when it hovers, when it leaves, and when it lands!"

---

### 4. The Drag Start Function

```javascript
function dragStart(e) {
  e.dataTransfer.setData("text/plain", this.id);
}
```

**What it is:** Called when user STARTS dragging a card.

**Breaking it down:**

| Code                             | What it does                          |
| -------------------------------- | ------------------------------------- |
| `e`                              | The event object (contains drag info) |
| `e.dataTransfer`                 | Special drag-and-drop data storage    |
| `setData("text/plain", this.id)` | Store the card's ID                   |
| `this`                           | The card being dragged                |
| `this.id`                        | e.g., "card1", "card2", "card3"       |

**Why store the ID?**

- When we DROP the card, we need to know WHICH card was dragged
- `dataTransfer` carries data from dragstart to drop
- It's like putting a **name tag** on the card before throwing it

**Understanding `dataTransfer`:**

```javascript
// Store data at drag START
e.dataTransfer.setData("text/plain", "card1");

// Retrieve data at DROP
const id = e.dataTransfer.getData("text/plain"); // "card1"
```

**Analogy:** Like writing your name on a paper airplane before throwing it—the person who catches it knows who sent it!

> **🔥 Exam Tip:** "What is `dataTransfer` in drag-and-drop?" — An object that holds data during a drag operation. Use `setData()` to store, `getData()` to retrieve.

---

### 5. The Drag End Function

```javascript
function dragEnd() {
  console.log("Drag ended");
}
```

**What it is:** Called when user STOPS dragging (whether dropped or not).

**Purpose:**

- Currently just logs a message
- Could be used for cleanup, animations, or analytics
- Fires even if drop was cancelled

**Analogy:** Like a camera that takes a photo when you put something down—good for logging!

---

### 6. The Drag Over Function

```javascript
function dragOver(e) {
  e.preventDefault();
}
```

**What it is:** Called CONTINUOUSLY while something is dragged over a list.

**The CRITICAL part: `e.preventDefault()`**

**Why is this necessary?**

- By DEFAULT, elements don't allow dropping
- `preventDefault()` tells the browser "Yes, dropping IS allowed here"
- Without this, the `drop` event will NEVER fire!

**Analogy:** It's like a **bouncer at a club** saying "You can come in!" Without it, no one gets in!

> **🔥 Exam Tip:** "Why do we need `e.preventDefault()` in `dragover`?" — By default, dropping is not allowed. `preventDefault()` enables the drop zone to accept drops.

---

### 7. The Drag Enter Function

```javascript
function dragEnter(e) {
  e.preventDefault();

  this.classList.add("over");
}
```

**What it is:** Called when a dragged item ENTERS a list's boundary.

**Breaking it down:**

| Code                         | What it does           |
| ---------------------------- | ---------------------- |
| `e.preventDefault()`         | Allows dropping        |
| `this`                       | The list being entered |
| `this.classList.add("over")` | Adds the `.over` class |

**What does adding `.over` do?**

- CSS has `.list.over { background-color: #333; }`
- The list turns dark gray
- User sees "This is a valid drop zone!"

**Understanding `classList`:**

```javascript
element.classList.add("class"); // Add a class
element.classList.remove("class"); // Remove a class
element.classList.toggle("class"); // Add if missing, remove if present
element.classList.contains("class"); // Check if class exists (true/false)
```

**Analogy:** Like a **parking space lighting up** when a car approaches!

---

### 8. The Drag Leave Function

```javascript
function dragLeave(e) {
  this.classList.remove("over");
}
```

**What it is:** Called when a dragged item EXITS a list's boundary.

**What it does:**

- Removes the `.over` class
- List returns to normal gray background
- Visual feedback is removed

**Analogy:** The parking space light **turns off** when the car drives away!

---

### 9. The Drag Drop Function

```javascript
function dragDrop(e) {
  const id = e.dataTransfer.getData("text/plain");

  const card = document.getElementById(id);

  this.appendChild(card);

  this.classList.remove("over");
}
```

**What it is:** Called when user DROPS a card onto a list.

**Step by step:**

| Step | Code                            | What happens                 |
| ---- | ------------------------------- | ---------------------------- |
| 1    | `e.dataTransfer.getData(...)`   | Retrieve the stored card ID  |
| 2    | `document.getElementById(id)`   | Find the actual card element |
| 3    | `this.appendChild(card)`        | Move card into this list     |
| 4    | `this.classList.remove("over")` | Remove dark background       |

**Understanding `appendChild()`:**

```javascript
// Before: card is in list1
list2.appendChild(card);
// After: card is NOW in list2 (automatically removed from list1!)
```

**Key insight:** `appendChild()` MOVES elements—it doesn't copy them. The card is automatically removed from its previous parent!

**Analogy:** Like physically **picking up a sticky note** from one column and **sticking it** in another. It can only be in one place at a time!

> **🔥 Exam Tip:** "What does `appendChild()` do to an element that's already in the DOM?" — It MOVES the element. The element is automatically removed from its current parent and added to the new parent.

---

## 🔄 Complete Drag-and-Drop Flow

```
┌──────────────────────────────────────────────────────────────┐
│  1. USER CLICKS AND HOLDS A CARD                             │
│     └─→ dragstart fires                                      │
│         └─→ Card ID stored in dataTransfer                   │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  2. USER DRAGS OVER A LIST                                   │
│     └─→ dragenter fires                                      │
│         └─→ .over class added (dark background)              │
│     └─→ dragover fires (continuously)                        │
│         └─→ preventDefault() allows dropping                 │
└──────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
┌─────────────────────────┐     ┌─────────────────────────────┐
│  3a. USER LEAVES LIST   │     │  3b. USER DROPS IN LIST     │
│  └─→ dragleave fires    │     │  └─→ drop fires             │
│      └─→ .over removed  │     │      └─→ Get card ID        │
└─────────────────────────┘     │      └─→ Find card element  │
                                │      └─→ appendChild moves  │
                                │      └─→ .over removed      │
                                └─────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  4. USER RELEASES MOUSE                                      │
│     └─→ dragend fires                                        │
│         └─→ Console logs "Drag ended"                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔗 Relationships: How JS Connects to HTML/CSS

### JavaScript → HTML Connections

```
JavaScript                          HTML Element
─────────────────────────────────────────────────────────
querySelectorAll(".card")       →   All <div class="card">
querySelectorAll(".list")       →   All <div class="list">
getElementById(id)              →   Specific card by ID
this.appendChild(card)          →   Moves card into list
```

### JavaScript → CSS Connections

```javascript
this.classList.add("over"); // Triggers .list.over { background: #333 }
this.classList.remove("over"); // Removes the dark background
```

### HTML `draggable` → JavaScript Events

```html
<div class="card" draggable="true">← Enables drag events</div>
```

Without `draggable="true"`, the `dragstart` event would never fire!

---

## 📚 Drag-and-Drop Events Summary

| Event       | Fires on        | When                 | Must `preventDefault()`? |
| ----------- | --------------- | -------------------- | ------------------------ |
| `dragstart` | Dragged element | Drag begins          | No                       |
| `drag`      | Dragged element | During drag          | No                       |
| `dragend`   | Dragged element | Drag ends            | No                       |
| `dragenter` | Drop target     | Enter target         | Yes (to allow drop)      |
| `dragover`  | Drop target     | Over target          | **Yes (required!)**      |
| `dragleave` | Drop target     | Leave target         | No                       |
| `drop`      | Drop target     | Released over target | No                       |

---

## 📚 JavaScript Concepts Summary

### Variables

| Keyword | Reassignable? | Scope    | Use case                 |
| ------- | ------------- | -------- | ------------------------ |
| `const` | No ❌         | Block    | Values that won't change |
| `let`   | Yes ✅        | Block    | Values that will change  |
| `var`   | Yes ✅        | Function | Avoid (old syntax)       |

### Loop Types

```javascript
// for...of (iterate over values)
for (const item of array) {
}

// for...in (iterate over keys/indices)
for (const index in array) {
}

// forEach (array method)
array.forEach((item) => {});

// Traditional for loop
for (let i = 0; i < array.length; i++) {}
```

### `this` Keyword in Event Handlers

In event handlers, `this` refers to the element that has the listener:

```javascript
card.addEventListener("dragstart", function () {
  console.log(this); // The card that was dragged
});

list.addEventListener("drop", function () {
  console.log(this); // The list that received the drop
});
```

### DOM Methods Used

| Method                        | Purpose                    | Returns     |
| ----------------------------- | -------------------------- | ----------- |
| `querySelectorAll(selector)`  | Find all matching elements | NodeList    |
| `getElementById(id)`          | Find element by ID         | Element     |
| `addEventListener(event, fn)` | Attach event handler       | undefined   |
| `appendChild(element)`        | Move/add element           | The element |
| `classList.add(class)`        | Add CSS class              | undefined   |
| `classList.remove(class)`     | Remove CSS class           | undefined   |

---

## 🎯 Common Exam Questions

**Q: What is the HTML5 Drag and Drop API?**
A: A set of events and methods that enable dragging elements and dropping them in designated zones.

**Q: Why is `preventDefault()` needed in `dragover`?**
A: By default, most elements don't accept drops. `preventDefault()` tells the browser to allow dropping.

**Q: What does `dataTransfer` do?**
A: It holds data during a drag operation. Use `setData()` at dragstart, `getData()` at drop.

**Q: Does `appendChild()` copy or move an element?**
A: It MOVES the element. If the element is already in the DOM, it's removed from its current location.

**Q: What's the difference between `dragenter` and `dragover`?**
A: `dragenter` fires ONCE when entering a zone. `dragover` fires CONTINUOUSLY while over the zone.

**Q: What does `this` refer to in an event handler?**
A: The element that the event listener is attached to.

---

## 🔍 Comparison: Color Palette vs Kanban Board

| Aspect           | Color Palette     | Kanban Board                    |
| ---------------- | ----------------- | ------------------------------- |
| Main interaction | Click             | Drag-and-drop                   |
| API used         | Clipboard API     | Drag & Drop API                 |
| Data storage     | None              | dataTransfer                    |
| Event types      | click             | dragstart, dragover, drop, etc. |
| Visual feedback  | Icon change       | Background color change         |
| DOM manipulation | Change text/style | Move elements                   |

---

## ✅ Key Takeaways

1. **`draggable="true"`** in HTML enables dragging
2. **`dataTransfer`** carries data from dragstart to drop
3. **`preventDefault()`** is REQUIRED in `dragover` to allow drops
4. **`dragenter`** = entering zone, **`dragover`** = hovering over zone
5. **`appendChild()`** MOVES elements, doesn't copy
6. **`classList.add/remove`** connects JavaScript to CSS styling
7. **`this`** in event handlers refers to the element with the listener
8. **`for...of`** is a clean way to loop through NodeLists
9. **Event flow**: dragstart → dragenter → dragover → drop → dragend

---

## 🆕 Extended Features: Persistence, CRUD & Filtering

The Kanban board now includes additional functionality beyond basic drag-and-drop:

- **Create** new cards via modal input
- **Read** cards from localStorage on page load
- **Update** card text via edit modal
- **Delete** cards with × button
- **Filter** cards by search text and category
- **Persist** all changes to localStorage

---

### 10. Extended DOM Selection

```javascript
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("AddCardButton");
const deleteButton = document.getElementById("DeleteCardButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cardCounter = 0; // Counter for dynamically created cards
```

| Variable         | What it holds                             | Mutable?      |
| ---------------- | ----------------------------------------- | ------------- |
| `cards`          | NodeList of `.card` elements at load time | No (const)    |
| `lists`          | NodeList of `.list` elements              | No (const)    |
| `addButton`      | Reference to Add Tasks button             | No (const)    |
| `searchInput`    | Reference to search text input            | No (const)    |
| `categoryFilter` | Reference to category dropdown            | No (const)    |
| `cardCounter`    | Numeric ID suffix for new cards           | **Yes (let)** |

**Why `let` for cardCounter?**

- It needs to be incremented each time a new card is created
- `const` would prevent reassignment

> **Note:** `cards` is a **static NodeList** — dynamically created cards won't be in it! The code attaches listeners when creating new cards.

---

### 11. localStorage Persistence: `saveCards()`

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

**Step-by-step breakdown:**

| Step | Code                                 | What it does                         |
| ---- | ------------------------------------ | ------------------------------------ |
| 1    | `document.querySelectorAll(".card")` | Get all current cards                |
| 2    | `[...]`                              | Spread into array (NodeList → Array) |
| 3    | `.map(card => {...})`                | Transform each card into an object   |
| 4    | `card.querySelector('.card-text')`   | Find the text span inside card       |
| 5    | `textSpan.textContent.trim()`        | Get the clean text content           |
| 6    | `card.parentElement.id`              | Get which list the card is in        |
| 7    | `JSON.stringify(data)`               | Convert array to JSON string         |
| 8    | `localStorage.setItem(...)`          | Save to browser storage              |

**Understanding the spread operator `[...]`:**

```javascript
const nodeList = document.querySelectorAll(".card"); // NodeList
const array = [...nodeList]; // Array
// Now we can use .map(), .filter(), etc.
```

**What gets saved:**

```json
[
  { "id": "card1", "text": "Wash Dishes", "listId": "list1" },
  { "id": "card2", "text": "Buy Groceries", "listId": "list1" },
  { "id": "card3", "text": "Learn to Code", "listId": "list2" }
]
```

> **🔥 Exam Tip:** `localStorage` stores data as **strings only**. Always use `JSON.stringify()` to save objects and `JSON.parse()` to retrieve them!

---

### 12. Loading from Storage: `loadCards()`

```javascript
function loadCards() {
  const data = JSON.parse(localStorage.getItem("kanbanCards") || "[]");

  document.querySelectorAll(".card").forEach((card) => card.remove());

  data.forEach(({ id, text, listId }) => {
    const card = document.createElement("div");
    card.className = "card";
    card.draggable = true;
    card.id = id;

    // Create text span
    const textSpan = document.createElement("span");
    textSpan.className = "card-text";
    textSpan.textContent = text;
    card.appendChild(textSpan);

    // Add delete button
    const deleteBtn = document.createElement("span");
    deleteBtn.className = "delete-card-btn";
    deleteBtn.innerHTML = "×";
    deleteBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      card.remove();
      saveCards();
    });
    card.appendChild(deleteBtn);

    // Attach event listeners
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    card.addEventListener("click", function (e) {
      if (!e.target.classList.contains("delete-card-btn")) {
        editCard(card);
      }
    });

    document.getElementById(listId).appendChild(card);

    const num = +id.replace("card", "");
    if (num >= cardCounter) cardCounter = num;
  });
}
```

**Step-by-step breakdown:**

| Step | What happens                                     |
| ---- | ------------------------------------------------ |
| 1    | Parse JSON from localStorage (or empty array)    |
| 2    | Remove ALL existing cards from DOM               |
| 3    | Loop through saved data                          |
| 4    | Create new card element with `createElement`     |
| 5    | Add text span and delete button                  |
| 6    | Attach all event listeners (drag, click, delete) |
| 7    | Append card to correct list                      |
| 8    | Update `cardCounter` to avoid ID collisions      |

**Understanding destructuring: `({ id, text, listId })`**

```javascript
// Instead of:
data.forEach((item) => {
  const id = item.id;
  const text = item.text;
  const listId = item.listId;
});

// We can write:
data.forEach(({ id, text, listId }) => {
  // id, text, listId are already available!
});
```

**Why remove existing cards first?**

- Prevents duplicates when localStorage has data
- Ensures a clean slate before reconstructing from storage

**Understanding `e.stopPropagation()`:**

```javascript
deleteBtn.addEventListener("click", function (e) {
  e.stopPropagation(); // Prevents the click from bubbling up to the card
  card.remove(); // Without this, editCard() would also be called!
});
```

---

### 13. Search & Filter: `filterCards()`

```javascript
function filterCards() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  const allCards = document.querySelectorAll(".card");

  allCards.forEach((card) => {
    const textSpan = card.querySelector(".card-text");
    const cardText = textSpan
      ? textSpan.textContent.toLowerCase().trim()
      : card.textContent.replace("×", "").toLowerCase().trim();
    const cardCategory = card.parentElement.id;

    const matchesSearch = cardText.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || cardCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}

searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);
```

**Logic breakdown:**

```
User types "wash" in search box
         ↓
searchTerm = "wash"
         ↓
For each card:
  cardText = "wash dishes"
  matchesSearch = "wash dishes".includes("wash") → true
  matchesCategory = (selectedCategory === "all") → true
         ↓
  Both true → card.classList.remove("hidden") → VISIBLE
```

**Two conditions must be met:**

| Condition         | Check                                          | Example                              |
| ----------------- | ---------------------------------------------- | ------------------------------------ |
| `matchesSearch`   | Text contains search term                      | "wash dishes".includes("wash") = ✅  |
| `matchesCategory` | Card is in selected category OR "all" selected | card in list1, filter = "list1" = ✅ |

**Event bindings:**

| Event    | Trigger                      | When it fires    |
| -------- | ---------------------------- | ---------------- |
| `input`  | User types in search box     | Every keystroke  |
| `change` | User selects dropdown option | Selection change |

**CSS connection:**

```css
.card.hidden {
  display: none;
}
```

---

### 14. Edit Card Modal: `editCard()`

```javascript
function editCard(card) {
  const editPane = document.createElement("div");
  editPane.id = "editNamePane";

  const textSpan = card.querySelector(".card-text");
  const currentText = textSpan
    ? textSpan.textContent.trim()
    : card.textContent.replace("×", "").trim();

  editPane.innerHTML = `
        <label for="editCardInput">Edit Task Name:</label>
        <input type="text" id="editCardInput" value="${currentText}">
    `;
  //sets everything into stone
  document.body.appendChild(editPane);

  // focuses the text box for the html element "editCardInput"
  const editInput = document.getElementById("editCardInput");
  editInput.focus();
  editInput.select();

  editInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newName = editInput.value.trim();
      if (newName !== "") {
        textSpan.textContent = newName;
          ();
        editPane.remove();
      }
      //if we press, escape, then the editpane is removed
    } else if (event.key === "Escape") {
      editPane.remove();
    }
  });

  //removed the edit pane when something is clicked in the inside
  editPane.addEventListener("click", function (e) {
    if (e.target === editPane) {
      editPane.remove();
    }
  });
}
```

**User flow:**

```
┌───────────────────────────────────────────────────────┐
│  1. User clicks on a card (not the delete button)    │
│     └─→ editCard(card) is called                     │
└───────────────────────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────┐
│  2. Modal appears with current text in input          │
│     └─→ Input is focused and text is selected        │
└───────────────────────────────────────────────────────┘
                         ↓
┌───────────────────────────────────────────────────────┐
│  3. User types new text and presses Enter            │
│     └─→ Card text updated                            │
│     └─→ saveCards() persists change                  │
│     └─→ Modal removed                                │
└───────────────────────────────────────────────────────┘
```

**Keyboard shortcuts:**

| Key           | Action                 |
| ------------- | ---------------------- |
| Enter         | Save changes and close |
| Escape        | Cancel and close       |
| Click outside | Cancel and close       |

**Understanding `editInput.select()`:**

- Highlights all text in the input
- User can immediately start typing to replace

---

### 15. Add New Card: `addNewCard()` and `createActualCard()`

```javascript
addButton.addEventListener("click", addNewCard);

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

  enterNamePane.addEventListener("click", function (e) {
    if (e.target === enterNamePane) {
      enterNamePane.remove();
    }
  });
}
```

**Why separate `addNewCard()` and `createActualCard()`?**

- `addNewCard()` handles the **UI** (showing modal, getting input)
- `createActualCard()` handles the **logic** (creating DOM element, persisting)
- Separation of concerns = cleaner, more maintainable code

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

  // Add delete button
  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-card-btn";
  deleteBtn.innerHTML = "X";
  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    newCard.remove();
    saveCards();
  });
  newCard.appendChild(deleteBtn);

  // Attach event listeners
  newCard.addEventListener("dragstart", dragStart);
  newCard.addEventListener("dragend", dragEnd);
  newCard.addEventListener("click", function (e) {
    if (!e.target.classList.contains("delete-card-btn")) {
      editCard(newCard);
    }
  });

  document.getElementById("list1").appendChild(newCard);
  saveCards();

  if (searchInput.value.trim() !== "") {
    filterCards();
  }
}
```

**New card always goes to list1 ("To Do")** — this is the standard Kanban workflow where new tasks start in the backlog.

**Why check `searchInput.value` at the end?**

- If the user has an active search, the new card might not match
- Running `filterCards()` ensures the display stays consistent

---

### 16. Page Load: DOMContentLoaded

```javascript
window.addEventListener("DOMContentLoaded", loadCards);
```

**What is DOMContentLoaded?**

- Fires when the HTML is fully parsed
- Does NOT wait for images, stylesheets, etc.
- Earlier than `window.onload`

**Why use it?**

- Ensures all HTML elements exist before `loadCards()` runs
- Restores persisted state as soon as possible

```
Page Load Timeline:
─────────────────────────────────────────────────────────────
HTML parsing starts
         ↓
HTML parsing ends ──→ DOMContentLoaded fires ──→ loadCards()
         ↓
Images, CSS load
         ↓
window.onload fires
─────────────────────────────────────────────────────────────
```

---

## 📚 Extended Concepts Summary

### localStorage API

| Method                | Purpose       | Example                                               |
| --------------------- | ------------- | ----------------------------------------------------- |
| `setItem(key, value)` | Save data     | `localStorage.setItem("cards", JSON.stringify(data))` |
| `getItem(key)`        | Retrieve data | `JSON.parse(localStorage.getItem("cards"))`           |
| `removeItem(key)`     | Delete item   | `localStorage.removeItem("cards")`                    |
| `clear()`             | Delete all    | `localStorage.clear()`                                |

**Key points:**

- Data persists across browser sessions
- Storage limit ~5-10MB per domain
- **Only stores strings** — must stringify/parse objects

---

### Event Propagation

```
           ┌─────────────┐
           │   document  │
           └──────┬──────┘
                  │ ← Capturing phase (down)
           ┌──────▼──────┐
           │    .card    │
           └──────┬──────┘
                  │
           ┌──────▼──────┐
           │ .delete-btn │ ← Target (event fires)
           └──────┬──────┘
                  │ ← Bubbling phase (up)
                  ▼
         e.stopPropagation() stops bubbling!
```

**Why `e.stopPropagation()` on delete button?**

- Without it, clicking delete would also trigger the card's click handler
- This would open the edit modal right before the card is deleted!

---

### Template Literals

```javascript
editPane.innerHTML = `
    <label for="editCardInput">Edit Task Name:</label>
    <input type="text" id="editCardInput" value="${currentText}">
`;
```

**Features:**

- Backticks `` ` `` allow multi-line strings
- `${variable}` embeds expressions
- Cleaner than string concatenation

---

## 🎯 Extended Exam Questions

**Q: How does localStorage differ from sessionStorage?**
A: localStorage persists until explicitly cleared; sessionStorage clears when the tab closes.

**Q: Why use `JSON.stringify()` with localStorage?**
A: localStorage only stores strings. Objects must be converted to JSON strings.

**Q: What does `e.stopPropagation()` do?**
A: It prevents the event from bubbling up to parent elements.

**Q: When does DOMContentLoaded fire vs window.onload?**
A: DOMContentLoaded fires when HTML is parsed; window.onload waits for all resources (images, CSS).

**Q: Why separate `addNewCard()` and `createActualCard()`?**
A: Separation of concerns — one handles UI, the other handles logic.

---

## ✅ Updated Key Takeaways

1. **`draggable="true"`** in HTML enables dragging
2. **`dataTransfer`** carries data from dragstart to drop
3. **`preventDefault()`** is REQUIRED in `dragover` to allow drops
4. **`appendChild()`** MOVES elements, doesn't copy
5. **`localStorage`** stores data as strings — use `JSON.stringify/parse`
6. **`DOMContentLoaded`** fires when HTML is ready (before images load)
7. **`e.stopPropagation()`** prevents event bubbling to parent elements
8. **Spread operator `[...]`** converts NodeList to Array for `.map()`
9. **Destructuring `({ id, text })`** extracts properties from objects
10. **Template literals** allow multi-line strings with embedded expressions

---

**Good luck on your exam! 🍀 Remember: JavaScript is the BEHAVIOR — it makes everything interactive!**
