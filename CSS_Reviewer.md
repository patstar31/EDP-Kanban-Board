# 🎨 CSS Reviewer: Kanban Board

## 🎯 Purpose Overview

This CSS file is the **interior designer** of our Kanban Board application. While HTML creates the structure (the building), CSS makes it **visually appealing and user-friendly**. Think of CSS as the paint, furniture arrangement, and lighting that transforms an empty office into a productive workspace!

**What this file does:**

- Creates a clean, centered layout for the board
- Styles the three columns with subtle shadows
- Makes cards look like interactive sticky notes
- Adds visual feedback when dragging (cursor changes, card scales up)
- Highlights drop zones when dragging cards over them
- Ensures responsive design for mobile devices

---

## 🔤 CSS Fundamentals: How CSS Works

### The Basic Syntax

```css
selector {
  property: value;
}
```

| Part         | What it does           | Example                          |
| ------------ | ---------------------- | -------------------------------- |
| **Selector** | WHAT to style          | `body`, `.card`, `#list1`        |
| **Property** | WHICH aspect to change | `color`, `background`, `padding` |
| **Value**    | HOW to change it       | `red`, `20px`, `center`          |

**Analogy:** "Paint (`property`) the walls (`selector`) blue (`value`)."

---

## 🧱 Syntax Breakdown: Every Rule Explained

### 1. Universal Reset (`*`)

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
```

**What it is:** The `*` selector targets **EVERY element** on the page.

**Properties explained:**

| Property                 | Value                           | Why                             |
| ------------------------ | ------------------------------- | ------------------------------- |
| `padding: 0`             | No inner spacing                | Removes browser default padding |
| `margin: 0`              | No outer spacing                | Removes browser default margins |
| `box-sizing: border-box` | Include padding/border in width | Makes sizing predictable        |

**Why it's necessary:**

- Browsers add default styles (margins on `<body>`, padding on elements)
- Resetting removes these so YOU control all styling
- `box-sizing: border-box` is a **game-changer** for layout math

**Understanding `box-sizing: border-box`:**

```
Without border-box:          With border-box:
┌─────────────────┐          ┌─────────────────┐
│    padding      │          │ content+padding │
│  ┌───────────┐  │          │                 │
│  │  content  │  │          │   = 200px       │
│  └───────────┘  │          │                 │
│                 │          └─────────────────┘
│  = 200px + pad  │
└─────────────────┘

200px box + 20px padding     200px box INCLUDES padding
= 240px total! ❌             = 200px total! ✅
```

**Analogy:** Before decorating, you want a blank canvas—no previous tenant's decorations!

> **🔥 Exam Tip:** "What does `box-sizing: border-box` do?" — It makes the `width` property include padding and border, so a `200px` wide box stays `200px` even with padding!

---

### 2. Body Styling

```css
body {
  font-family: sans-serif;
  background-color: #f7f9fc;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

**Properties explained:**

| Property                    | Value                         | Purpose                       |
| --------------------------- | ----------------------------- | ----------------------------- |
| `font-family: sans-serif`   | Clean, modern font            | Easy to read text             |
| `background-color: #f7f9fc` | Light grayish-blue            | Soft, professional background |
| `display: flex`             | Flexbox layout                | Enables centering             |
| `justify-content: center`   | Horizontal centering          | Centers content left-to-right |
| `align-items: center`       | Vertical centering            | Centers content top-to-bottom |
| `min-height: 100vh`         | At least full viewport height | Page fills the screen         |

**Understanding `100vh`:**

- `vh` = viewport height (browser window height)
- `100vh` = 100% of the screen height
- `min-height` ensures it's AT LEAST that tall (can grow if needed)

**Analogy:** `display: flex` with centering is like placing a picture frame **exactly in the center of a wall** automatically!

---

### 3. Container Styling

```css
.container {
  text-align: center;
  width: 100%;
  padding: 1.2rem;
}
```

**Properties explained:**

| Property             | Value                | Purpose                       |
| -------------------- | -------------------- | ----------------------------- |
| `text-align: center` | Center text          | Centers the `<h1>` heading    |
| `width: 100%`        | Full width of parent | Uses all available space      |
| `padding: 1.2rem`    | Inner spacing        | Breathing room around content |

**Understanding `rem`:**

- `rem` = "root em" = relative to root font size (usually 16px)
- `1.2rem` = 1.2 × 16px = 19.2px
- Better than `px` for accessibility (scales with user font settings)

---

### 4. Heading Styling

```css
h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
}
```

**Properties explained:**

| Property              | Value       | Purpose                        |
| --------------------- | ----------- | ------------------------------ |
| `color: #333`         | Dark gray   | Easier on eyes than pure black |
| `margin-bottom: 20px` | Space below | Separates from the board       |
| `font-size: 2rem`     | Large text  | 32px (prominent title)         |

---

### 5. Board Layout (Flexbox)

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

**This is WHERE THE MAGIC HAPPENS for the 3-column layout!**

| Property                        | Value               | Purpose                        |
| ------------------------------- | ------------------- | ------------------------------ |
| `display: flex`                 | Flexbox layout      | Items arranged in a row        |
| `justify-content: space-around` | Even spacing        | Equal space around each column |
| `align-items: flex-start`       | Top alignment       | Columns align at the top       |
| `width: 100%`                   | Full width          | Uses available space           |
| `max-width: 1200px`             | Maximum 1200px      | Doesn't get too wide           |
| `margin: 0 auto`                | Center horizontally | Auto margins center the board  |
| `gap: 20px`                     | Space between items | 20px gap between columns       |

**Understanding `justify-content` values:**

```
space-around:                    space-between:
|  □  |  □  |  □  |             |□    |    □|    □|
   ↑     ↑     ↑                 ↑          ↑     ↑
Equal space around each         Space only between items
```

**Analogy:** Flexbox is like arranging books on a shelf—you tell the shelf HOW to distribute them!

> **🔥 Exam Tip:** "What's the difference between `justify-content: space-around` and `space-between`?" — `space-around` puts equal space around EACH item (including edges), `space-between` puts space only BETWEEN items (not at edges).

---

### 6. List (Column) Styling

```css
.list {
  background-color: lightgray;
  padding: 1rem;
  border-radius: 8px;
  width: 30%;
  min-height: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

**Properties explained:**

| Property                      | Value               | Purpose                          |
| ----------------------------- | ------------------- | -------------------------------- |
| `background-color: lightgray` | Gray background     | Distinguishes columns from cards |
| `padding: 1rem`               | Inner spacing       | Cards don't touch edges          |
| `border-radius: 8px`          | Rounded corners     | Modern, friendly look            |
| `width: 30%`                  | 30% of parent width | Three columns fit nicely         |
| `min-height: 400px`           | At least 400px tall | Columns have consistent height   |
| `box-shadow`                  | Shadow below        | Depth/elevated effect            |

**Understanding `box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3)`:**

```
box-shadow: X-offset  Y-offset  blur-radius  color
            0         4px       8px          rgba(0,0,0,0.3)
            ↓         ↓         ↓            ↓
            No shift  Down 4px  Soft edges   30% black
            left/right
```

**Analogy:** Box shadow is like the **shadow cast by a sticky note** held slightly above the desk!

---

### 7. List Heading Styling

```css
.list h2 {
  color: #555;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}
```

**What it is:** Styles `<h2>` elements ONLY when they're inside `.list`.

**This is a DESCENDANT SELECTOR:**

- `.list h2` = "Any h2 inside a .list"
- More specific than just `h2`

---

### 8. Card Styling

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
}
```

**Properties explained:**

| Property                  | Value             | Purpose                      |
| ------------------------- | ----------------- | ---------------------------- |
| `background-color: white` | White background  | Stands out on gray columns   |
| `color: #333`             | Dark gray text    | Readable task text           |
| `padding: 1rem`           | Inner spacing     | Comfortable reading space    |
| `margin-bottom: 10px`     | Space below       | Cards don't touch each other |
| `border-radius: 8px`      | Rounded corners   | Consistent with column style |
| `cursor: grab`            | Grab hand cursor  | Shows it's draggable!        |
| `box-shadow`              | Subtle shadow     | Depth effect                 |
| `transition`              | Smooth animations | Changes happen gradually     |

**Understanding `cursor: grab`:**

```
cursor: default   → Arrow
cursor: pointer   → Hand with finger (clickable)
cursor: grab      → Open hand (draggable) ✋
cursor: grabbing  → Closed hand (currently dragging) ✊
```

**Understanding `transition: transform 0.2s, box-shadow 0.2s`:**

- When `transform` or `box-shadow` changes, animate over 0.2 seconds
- Makes interactions feel smooth, not abrupt

**Analogy:** `transition` is like **slow-motion**—instead of instant changes, things ease into their new state!

---

### 9. Card Active State (While Dragging)

```css
.card:active {
  cursor: grabbing;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}
```

**What it does:** Styles the card WHILE it's being clicked/dragged.

| Property                | Effect                           |
| ----------------------- | -------------------------------- |
| `cursor: grabbing`      | Closed hand cursor ✊            |
| `transform: scale(1.1)` | Card grows 10% larger            |
| `box-shadow`            | Stronger shadow (appears lifted) |

**Understanding `:active`:**

- Triggers when element is being clicked/pressed
- For draggable elements, stays active during the drag

**Understanding `transform: scale(1.1)`:**

- `scale(1)` = normal size (100%)
- `scale(1.1)` = 110% size (10% bigger)
- `scale(0.5)` = 50% size (half)

**Analogy:** Like picking up a sticky note—it appears bigger and casts a larger shadow when lifted!

> **🔥 Exam Tip:** "What does `transform: scale()` do?" — It resizes an element. `scale(1.1)` makes it 10% larger, `scale(0.5)` makes it half the size.

---

### 10. List Hover State (Drop Zone Indicator)

```css
.list.over {
  background-color: #333;
}
```

**What it is:** Styles a list when it has BOTH `.list` AND `.over` classes.

**Important:** This is NOT a hover state—it's a **class added by JavaScript** when dragging a card over the list!

**Understanding `.list.over` (no space):**

- `.list .over` (with space) = `.over` element INSIDE `.list`
- `.list.over` (no space) = Element with BOTH classes

**How it works:**

1. User drags card over a list
2. JavaScript adds `.over` class to that list
3. CSS applies dark background
4. User sees visual feedback for drop zone

**Analogy:** It's like a **parking spot lighting up** when you're about to park there!

---

### 11. Media Query (Responsive Design)

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

**What it is:** Applies different styles when screen is 770px or narrower.

**Changes on mobile:**

| Property         | Desktop            | Mobile           |
| ---------------- | ------------------ | ---------------- |
| `flex-direction` | row (side-by-side) | column (stacked) |
| `.list width`    | 30%                | 80%              |
| Column layout    | Horizontal         | Vertical         |

**Understanding `flex-direction`:**

```
flex-direction: row (default)     flex-direction: column
┌───┐ ┌───┐ ┌───┐                 ┌───────────────┐
│ 1 │ │ 2 │ │ 3 │                 │       1       │
└───┘ └───┘ └───┘                 ├───────────────┤
                                  │       2       │
                                  ├───────────────┤
                                  │       3       │
                                  └───────────────┘
```

**Analogy:** Media queries are like **outfit changes for different weather**—your board wears different layouts for different screen sizes!

> **🔥 Exam Tip:** "What is a media query?" — A conditional rule that applies styles only when certain conditions (like screen width) are met.

---

## 🔗 Relationships: CSS ↔ HTML

### How CSS Finds HTML Elements

| CSS Selector   | HTML it targets                       |
| -------------- | ------------------------------------- |
| `*`            | Every single element                  |
| `body`         | `<body>` tag                          |
| `h1`           | `<h1>` tag                            |
| `.container`   | `<div class="container">`             |
| `.board`       | `<div class="board">`                 |
| `.list`        | `<div class="list">`                  |
| `.list h2`     | `<h2>` inside `.list`                 |
| `.card`        | `<div class="card">`                  |
| `.card:active` | `.card` while being clicked           |
| `.list.over`   | `.list` with additional `.over` class |

### CSS ↔ JavaScript Connection

```javascript
// JavaScript adds/removes the .over class
this.classList.add("over"); // Triggers .list.over styles
this.classList.remove("over"); // Removes .list.over styles
```

This is how CSS and JavaScript work together—JS changes classes, CSS responds to those changes!

---

## 📐 Layout Visualization

### Desktop Layout (>770px)

```
┌─────────────────────────────────────────────────────┐
│                   Kanban Board                       │
├─────────────────────────────────────────────────────┤
│  ┌─────────┐    ┌─────────┐    ┌─────────┐         │
│  │ To Do   │    │In Progr.│    │  Done   │         │
│  │─────────│    │─────────│    │─────────│         │
│  │ Card 1  │    │ Card 3  │    │         │         │
│  │ Card 2  │    │         │    │         │         │
│  │         │    │         │    │         │         │
│  └─────────┘    └─────────┘    └─────────┘         │
│     30%            30%            30%               │
└─────────────────────────────────────────────────────┘
```

### Mobile Layout (≤770px)

```
┌─────────────────────┐
│    Kanban Board     │
├─────────────────────┤
│  ┌───────────────┐  │
│  │    To Do      │  │
│  │───────────────│  │
│  │    Card 1     │  │
│  │    Card 2     │  │
│  └───────────────┘  │
│        80%          │
│  ┌───────────────┐  │
│  │  In Progress  │  │
│  │───────────────│  │
│  │    Card 3     │  │
│  └───────────────┘  │
│        80%          │
│  ┌───────────────┐  │
│  │     Done      │  │
│  └───────────────┘  │
│        80%          │
└─────────────────────┘
```

---

## 🎨 Color Values Used

| Color           | Hex/Name    | Used for                  |
| --------------- | ----------- | ------------------------- |
| Light Gray-Blue | `#f7f9fc`   | Body background           |
| Light Gray      | `lightgray` | List columns              |
| Dark Gray       | `#333`      | Text, drop zone indicator |
| Medium Gray     | `#555`      | Column headings           |
| White           | `white`     | Cards                     |

---

## 📐 Units Cheat Sheet

| Unit  | Stands for      | Relative to                   |
| ----- | --------------- | ----------------------------- |
| `px`  | Pixels          | Fixed size                    |
| `%`   | Percent         | Parent element                |
| `rem` | Root em         | Root font-size (16px default) |
| `vh`  | Viewport height | Browser window height         |

---

## ✅ Key Takeaways

1. **Universal reset (`*`)** removes browser defaults for consistent styling
2. **`box-sizing: border-box`** makes width calculations intuitive
3. **Flexbox** (`display: flex`) creates the 3-column layout
4. **`justify-content: space-around`** distributes columns evenly
5. **`cursor: grab/grabbing`** provides drag-and-drop visual feedback
6. **`transition`** makes property changes smooth
7. **`transform: scale()`** enlarges elements during interaction
8. **`.list.over`** is activated by JavaScript, not CSS hover
9. **Media queries** make the layout responsive
10. **`flex-direction: column`** stacks columns vertically on mobile

---

## 📝 Property Quick Reference

| Property          | What it controls                            |
| ----------------- | ------------------------------------------- |
| `margin`          | Space OUTSIDE the element                   |
| `padding`         | Space INSIDE the element                    |
| `display: flex`   | Enables flexbox layout                      |
| `justify-content` | Main axis alignment (horizontal by default) |
| `align-items`     | Cross axis alignment (vertical by default)  |
| `flex-direction`  | Row or column layout                        |
| `gap`             | Space between flex items                    |
| `cursor`          | Mouse cursor appearance                     |
| `transition`      | Animate property changes                    |
| `transform`       | Rotate, scale, move elements                |
| `box-shadow`      | Shadow effect                               |
| `border-radius`   | Rounded corners                             |

---

**Good luck on your exam! 🍀 Remember: CSS is about HOW things look and feel!**
