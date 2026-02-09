# 📘 HTML Reviewer: Kanban Board

## 🎯 Purpose Overview

This HTML file serves as the **skeleton** of our Kanban Board web application. A Kanban board is a project management tool that visualizes work in columns (like "To Do", "In Progress", "Done"). Think of HTML as the **blueprint of an office building**—it defines where the departments (columns) go and where the sticky notes (cards) are placed.

**What this file does:**

- Creates the structure of a 3-column task management board
- Defines draggable task cards that can be moved between columns
- Sets up the foundation for drag-and-drop functionality
- Links to external CSS and JavaScript files

---

## 🧱 Syntax Breakdown: Every Tag Explained

### 1. `<!DOCTYPE html>`

```html
<!DOCTYPE html>
```

**What it is:** A declaration that tells the browser which version of HTML to expect.

**Why it's necessary:**

- Without this, browsers enter "quirks mode" and may render your page inconsistently
- It's like telling someone "I'm speaking English" before you start talking

**Analogy:** Imagine sending a package without a label. The post office might guess wrong about how to handle it! `<!DOCTYPE html>` says "Handle this as HTML5."

---

### 2. `<html lang="en">`

```html
<html lang="en"></html>
```

**What it is:** The root element that wraps ALL other HTML content.

**Why it's necessary:**

- `lang="en"` tells browsers and screen readers the page is in English
- Helps with accessibility (screen readers pronounce words correctly)
- Improves SEO (search engines know the language)

**Analogy:** This is like the **cover of a folder** that holds all documents together and has "English" labeled on it.

---

### 3. `<head>` Section

```html
<head>
  <!-- Metadata and links go here -->
</head>
```

**What it is:** Contains metadata (information ABOUT the page) that users don't directly see.

**Why it's necessary:**

- Holds the "behind-the-scenes" information
- Connects your page to external resources (CSS, fonts)

**Analogy:** The `<head>` is like the **project brief**—important information the team needs, but clients never see!

---

### 4. `<meta charset="UTF-8">`

```html
<meta charset="UTF-8" />
```

**What it is:** Specifies the character encoding for the document.

**Why it's necessary:**

- UTF-8 supports virtually all characters from all languages (including emojis! 📋)
- Without it, special characters might display as garbled text

**Analogy:** It's like setting your keyboard language—if set wrong, your text might look like gibberish!

---

### 5. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**What it is:** Controls how your page scales on different devices.

**Why it's necessary:**

- `width=device-width`: Page width matches the device's screen width
- `initial-scale=1.0`: No zoom when page first loads
- **Without this, mobile users see a tiny desktop version of your board!**

**Analogy:** Imagine a whiteboard that's always poster-sized. On a phone, you'd have to scroll forever! This tag makes the whiteboard "fit the screen."

> **🔥 Exam Tip:** "What happens if you delete the viewport meta tag?" — Your site will look terrible on mobile devices, appearing zoomed out and requiring horizontal scrolling.

---

### 6. `<title>Kanban Board</title>`

```html
<title>Kanban Board</title>
```

**What it is:** Sets the text shown in the browser tab.

**Why it's necessary:**

- Users identify your page among multiple tabs
- Search engines use it as the clickable headline in results
- Bookmarks save this text as the default name

**Analogy:** It's the **name tag** on the browser tab—without it, your tab just says "Untitled"!

---

### 7. `<link rel="stylesheet" href="style.css">`

```html
<link rel="stylesheet" href="style.css" />
```

**What it is:** Connects your HTML to your custom CSS file.

**Attributes explained:**
| Attribute | Purpose |
|-----------|---------|
| `rel="stylesheet"` | Tells browser this is a CSS file |
| `href="style.css"` | Path to the CSS file |

**Why it's necessary:**

- Separation of concerns: HTML handles structure, CSS handles style
- Makes code cleaner and easier to maintain

**Analogy:** The `<link>` tag is like **hiring an interior designer** (CSS) for your office (HTML).

---

### 8. `<body>` Section

```html
<body>
  <!-- Visible content goes here -->
</body>
```

**What it is:** Contains everything users actually SEE on the page.

**Why it's necessary:**

- This is where the "real" content lives
- Everything inside `<body>` renders on screen

**Analogy:** If `<html>` is the building and `<head>` is the building permit, `<body>` is **all the actual rooms and furniture**!

---

### 9. `<div class="container">`

```html
<div class="container"></div>
```

**What it is:** A generic container element used for grouping content.

**Why it's necessary:**

- Groups all board content together
- `class="container"` allows CSS to target and style this wrapper
- Creates a logical section of the page

**Analogy:** A `<div>` is like a **cardboard box**—it holds things together and you can label it (with a class) for organization.

---

### 10. `<h1>Kanban Board</h1>`

```html
<h1>Kanban Board</h1>
```

**What it is:** The main heading of the page (level 1 = most important).

**Why it's necessary:**

- Tells users and search engines what the page is about
- Screen readers announce headings for navigation
- There should typically be only ONE `<h1>` per page

**Analogy:** The `<h1>` is the **title on the whiteboard**—the biggest text that tells you what you're looking at.

---

### 11. `<div class="board">`

```html
<div class="board"></div>
```

**What it is:** A container that holds all three list columns.

**Why it's necessary:**

- Groups the three columns together
- CSS uses this to apply flexbox layout (side-by-side columns)
- Creates the "board" visual structure

**Analogy:** This is the **actual corkboard** that holds all the sticky note columns!

---

### 12. List Structure

```html
<div class="list" id="list1">
  <h2>To do</h2>
  <div class="card" draggable="true" id="card1">Wash Dishes</div>
  <div class="card" draggable="true" id="card2">Buy Groceries</div>
</div>
```

**Breaking it down:**

| Element              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `<div class="list">` | Container for one column                 |
| `id="list1"`         | Unique identifier for this specific list |
| `<h2>To do</h2>`     | Column header (second-level heading)     |
| `<div class="card">` | Individual task card                     |

**Why `id` AND `class`?**

- `class="list"` — Shared styling for ALL columns
- `id="list1"` — Unique identifier for JavaScript targeting

**Analogy:** All columns are "list" type (like all employees wear uniforms), but each has a unique ID badge!

---

### 13. Draggable Cards

```html
<div class="card" draggable="true" id="card1">Wash Dishes</div>
```

**Attributes explained:**

| Attribute          | Purpose                                 |
| ------------------ | --------------------------------------- |
| `class="card"`     | Styling shared by all cards             |
| `draggable="true"` | **ENABLES drag-and-drop functionality** |
| `id="card1"`       | Unique identifier for JavaScript        |

**Why `draggable="true"`?**

- By default, most elements are NOT draggable
- This attribute tells the browser "this element can be picked up and moved"
- JavaScript then handles WHERE it can be dropped

**Analogy:** `draggable="true"` is like putting a **handle on a sticky note**—without it, you can't pick it up!

> **🔥 Exam Tip:** "What does the `draggable` attribute do?" — It enables native HTML5 drag-and-drop functionality on an element. Without it, the element cannot be dragged.

---

### 14. HTML Comments

```html
<!-- LIST 1 -->
```

**What it is:** Comments that browsers ignore but humans can read.

**Why it's necessary:**

- Helps developers understand the code structure
- Makes it easier to find specific sections
- No impact on the final webpage

---

### 15. `<script src="script.js"></script>`

```html
<script src="script.js"></script>
```

**What it is:** Links to an external JavaScript file.

**Why it's necessary:**

- JavaScript adds the drag-and-drop behavior
- Placed at the END of `<body>` so HTML loads first
- If placed in `<head>`, the script might run before elements exist!

**Analogy:** JavaScript is the **nervous system**—it makes the cards actually respond when you drag them!

> **🔥 Exam Tip:** "Why is the script tag at the bottom?" — So the HTML elements exist before JavaScript tries to interact with them!

---

## 🔗 Relationships: How Files Connect

```
┌─────────────────────────────────────────────────────────────┐
│                        index.html                            │
│                    (The Structure)                           │
└─────────────────────────────────────────────────────────────┘
                │                           │
                │ <link>                    │ <script>
                ▼                           ▼
┌───────────────────────────┐   ┌────────────────────────────┐
│       style.css            │   │        script.js           │
│   (The Appearance)         │   │    (The Behavior)          │
└───────────────────────────┘   └────────────────────────────┘
```

### How they communicate:

1. **HTML → CSS** (via `<link>` and `class`/`id` attributes)
   - HTML says: "I have an element with `class="card"`"
   - CSS responds: "I'll style anything with that class!"

2. **HTML → JavaScript** (via `<script>` and `id`/`class` attributes)
   - HTML says: "I have cards with `draggable="true"`"
   - JS responds: "I'll make those cards movable between lists!"

3. **HTML `draggable` → JavaScript Events**: The `draggable="true"` attribute enables JS drag events

---

## 🎨 The Office Analogy

| Component      | Role         | Analogy                                                         |
| -------------- | ------------ | --------------------------------------------------------------- |
| **HTML**       | Structure    | The **office building** — defines rooms and furniture placement |
| **CSS**        | Appearance   | The **interior design** — colors, spacing, shadows              |
| **JavaScript** | Behavior     | The **employees** — they move tasks around the board            |
| **Cards**      | Content      | **Sticky notes** — the actual task items                        |
| **Lists**      | Organization | **Columns on a whiteboard** — To Do, In Progress, Done          |

---

## ✅ Key Takeaways

1. **`<!DOCTYPE html>`** prevents rendering issues
2. **`<meta viewport>`** is ESSENTIAL for mobile-friendly sites
3. **`id` is unique** (one per page), **`class` is reusable** (many per page)
4. **`draggable="true"`** enables HTML5 drag-and-drop
5. **`<link>`** connects CSS, **`<script>`** connects JavaScript
6. **Script at bottom** = HTML loads before JS runs
7. **Semantic meaning**: `<h1>` for main title, `<h2>` for section titles

---

## 📝 Quick Reference Table

| Tag                | Purpose                 | Required? |
| ------------------ | ----------------------- | --------- |
| `<!DOCTYPE html>`  | Declares HTML5          | Yes       |
| `<html lang="en">` | Root element + language | Yes       |
| `<head>`           | Metadata container      | Yes       |
| `<meta charset>`   | Character encoding      | Yes       |
| `<meta viewport>`  | Mobile responsiveness   | Yes\*     |
| `<title>`          | Browser tab text        | Yes       |
| `<link>`           | External stylesheets    | As needed |
| `<body>`           | Visible content         | Yes       |
| `<div>`            | Generic container       | As needed |
| `<h1>`, `<h2>`     | Headings                | As needed |
| `<script>`         | JavaScript files        | As needed |

---

## 📋 Kanban Board HTML Structure Diagram

```
<html>
├── <head>
│   ├── <meta charset>
│   ├── <meta viewport>
│   ├── <title>
│   └── <link> → style.css
│
└── <body>
    ├── <div class="container">
    │   ├── <h1>Kanban Board</h1>
    │   └── <div class="board">
    │       ├── <div class="list" id="list1">
    │       │   ├── <h2>To do</h2>
    │       │   ├── <div class="card" draggable>
    │       │   └── <div class="card" draggable>
    │       │
    │       ├── <div class="list" id="list2">
    │       │   ├── <h2>In Progress</h2>
    │       │   └── <div class="card" draggable>
    │       │
    │       └── <div class="list" id="list3">
    │           └── <h2>Done</h2>
    │
    ├── <div class="addCard">
    │   └── <button id="AddCardButton">
    │
    └── <script> → script3.js
```

---

## 🆕 Extended Features: Search, Filter & Card Management

### 16. Search Container

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

**Elements explained:**

| Element                | Purpose                                          |
| ---------------------- | ------------------------------------------------ |
| `#searchInput`         | Text input for filtering cards by task name      |
| `#categoryFilter`      | Dropdown to filter by column                     |
| `option value="list1"` | Value matches list `id` for easy filtering in JS |

**Why place it above the board?**

- Users naturally look at the top first
- Provides immediate access to filtering before scanning cards

---

### 17. Updated Card Structure

```html
<div class="card" draggable="true" id="card1">
  <span class="card-text">Wash Dishes</span>
  <span class="delete-card-btn">&times;</span>
</div>
```

**Breaking it down:**

| Element            | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `.card-text`       | Span containing the task text — makes editing easier |
| `.delete-card-btn` | × button to remove the card                          |
| `&times;`          | HTML entity for × symbol                             |

**Why separate the text into a `<span>`?**

- Easier to update with JavaScript (`textSpan.textContent = newText`)
- Delete button doesn't interfere with text manipulation
- CSS can style text and button independently

---

### 18. Add Tasks Button

```html
<div class="addCard">
  <button id="AddCardButton">Add Tasks</button>
</div>
```

**Why wrapped in a `<div>`?**

- `.addCard` uses `position: absolute` to place button at top-right
- Button itself uses default positioning within its container

**JavaScript connection:**

```javascript
addButton.addEventListener("click", addNewCard);
```

---

## 🔗 Updated File Relationships

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
│                           │   │                            │
│ • Search box styling      │   │ • Drag-and-drop            │
│ • Delete button styling   │   │ • Add/Edit/Delete cards    │
│ • Modal pane styling      │   │ • Search & Filter          │
│ • Hidden card display     │   │ • localStorage persistence │
└───────────────────────────┘   └────────────────────────────┘
```

---

## ✅ Updated Key Takeaways

1. **`<!DOCTYPE html>`** prevents rendering issues
2. **`<meta viewport>`** is ESSENTIAL for mobile-friendly sites
3. **`id` is unique** (one per page), **`class` is reusable** (many per page)
4. **`draggable="true"`** enables HTML5 drag-and-drop
5. **`<link>`** connects CSS, **`<script>`** connects JavaScript
6. **Script at bottom** = HTML loads before JS runs
7. **Semantic meaning**: `<h1>` for main title, `<h2>` for section titles
8. **`<span>` inside cards** separates text from delete button for easier manipulation
9. **`<select>` values match list IDs** for straightforward filtering

---

**Good luck on your exam! 🍀 Remember: HTML is about WHAT content exists and WHERE it goes!**
