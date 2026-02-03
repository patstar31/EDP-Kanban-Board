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

**Good luck on your exam! 🍀 Remember: JavaScript is the BEHAVIOR — it makes drag-and-drop possible!**
