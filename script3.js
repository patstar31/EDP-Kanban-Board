const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("AddCardButton");
const deleteButton= document.getElementById("DeleteCardButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cardCounter = 0; // Counter for dynamically created cards

//Dan Charbille
function saveCards() {
    const data = [...document.querySelectorAll(".card")].map(card => {
        // Get text from card-text span or fallback to textContent
        const textSpan = card.querySelector('.card-text');
        const text = textSpan ? textSpan.textContent.trim() : card.textContent.replace('×', '').trim();
        
        // NEW: Find the category span element inside the card
        const categorySpan = card.querySelector('.card-category');
        // NEW: If category span exists, get its text content; otherwise use empty string
        const category = categorySpan ? categorySpan.textContent.trim() : '';
        
        return {
            id: card.id,
            text: text,
            category: category, // NEW: Include category in the saved data object
            listId: card.parentElement.id
        };
    });
    
    localStorage.setItem("kanbanCards", JSON.stringify(data));
}

function loadCards() {
    const data = JSON.parse(localStorage.getItem("kanbanCards") || "[]");

    document.querySelectorAll(".card").forEach(card => card.remove());

    // NEW: Destructure category from the saved data along with id, text, and listId
    data.forEach(({ id, text, category, listId }) => {
        const card = document.createElement("div");
        card.className = "card";
        card.draggable = true;
        card.id = id;
        
        // Create text span
        const textSpan = document.createElement("span");
        textSpan.className = "card-text";
        textSpan.textContent = text;
        card.appendChild(textSpan);
        
        // NEW: Only create và display category span if a category was saved
        if (category && category.trim() !== '') {
            // NEW: Create a new span element for the category
            const categorySpan = document.createElement("span");
            // NEW: Give it the class 'card-category' for CSS styling
            categorySpan.className = "card-category";
            // NEW: Set the text content to the saved category value
            categorySpan.textContent = category;
            // NEW: Add the category span to the card (appears below task name)
            card.appendChild(categorySpan);
        }
        
        // Add delete button
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-card-btn";
        deleteBtn.innerHTML = "×";
        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            card.remove();
            saveCards();
        });
        card.appendChild(deleteBtn);
        
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);
        
        // Add click listener for editing
        card.addEventListener("click", function(e) {
            // Don't trigger edit if clicking delete button
            if (!e.target.classList.contains('delete-card-btn')) {
                editCard(card);
            }
        });

        document.getElementById(listId).appendChild(card);

        const num = +id.replace("card", "");
        if (num >= cardCounter) cardCounter = num;
    });
}

function filterCards() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const allCards = document.querySelectorAll(".card");
    
    allCards.forEach(card => {
        // Get text from card-text span or fallback
        const textSpan = card.querySelector('.card-text');
        const cardText = textSpan ? textSpan.textContent.toLowerCase().trim() : card.textContent.replace('×', '').toLowerCase().trim();
        
        // NEW: Find the category span element in the card
        const categorySpan = card.querySelector('.card-category');
        // NEW: Get category text in lowercase for case-insensitive search, or empty string if no category
        const taskCategory = categorySpan ? categorySpan.textContent.toLowerCase().trim() : '';
        
        const cardListId = card.parentElement.id; 
        
        // NEW: Check if search term matches either the task name OR the category text
        const matchesSearch = cardText.includes(searchTerm) || taskCategory.includes(searchTerm);
        
        const matchesCategory = selectedCategory === "all" || cardListId === selectedCategory;
        
        if (matchesSearch && matchesCategory) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);


//Patrick Han
// Function to edit a card
function editCard(card) {
    // Create edit panel
    const editPane = document.createElement("div");
    editPane.id = "editNamePane";
    
    // Get card text
    const textSpan = card.querySelector('.card-text');
    const currentText = textSpan ? textSpan.textContent.trim() : card.textContent.replace('×', '').trim();
    
    // NEW: Find the existing category span in the card
    const categorySpan = card.querySelector('.card-category');
    // NEW: Get current category text, or empty string if no category exists
    const currentCategory = categorySpan ? categorySpan.textContent.trim() : '';
    
    // NEW: Added a second input field for editing the category
    editPane.innerHTML = `
        <label for="editCardInput">Edit Task Name:</label>
        <input type="text" id="editCardInput" name="editCardInput" value="${currentText}">
        <label for="editCategoryInput" style="margin-top: 15px;">Category (optional):</label>
        <input type="text" id="editCategoryInput" name="editCategoryInput" value="${currentCategory}" placeholder="e.g., House Task">
    `;
    document.body.appendChild(editPane);

    // Focus and select all text for easy editing
    // NEW: Get reference to the category input field
    const editInput = document.getElementById("editCardInput");
    const editCategoryInput = document.getElementById("editCategoryInput");
    editInput.focus();
    editInput.select();
    
    // NEW: Created a separate function to handle saving both task name and category
    // NEW: Get the new category value from the input field
    function saveEdit() {
        const newName = editInput.value.trim();
        const newCategory = editCategoryInput.value.trim();
        
        //checks if the newName isnt empty
        // Update the card text
        if (newName !== "") {
            // Update the card text
            if (textSpan) {
                textSpan.textContent = newName;
            }
            
            // NEW: Check if a category span already exists in the card
            // NEW: If user entered a category
            let existingCategorySpan = card.querySelector('.card-category');
            if (newCategory !== '') {
                // NEW: If no category span exists, create one
                if (!existingCategorySpan) {
                    existingCategorySpan = document.createElement("span");
                    existingCategorySpan.className = "card-category";
                    // NEW: Find the delete button to insert category before it
                    const deleteBtn = card.querySelector('.delete-card-btn');
                    // NEW: Insert category span between task text and delete button
                    card.insertBefore(existingCategorySpan, deleteBtn);
                }
                // NEW: Update the category text content
                existingCategorySpan.textContent = newCategory;

                
            } else if (existingCategorySpan) {
                // NEW: If user cleared the category input, remove the category span entirely
                existingCategorySpan.remove();
            }
            
            saveCards();
            editPane.remove();
        }
    }
    
    // Handle Enter key to save on both inputs
    editInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveEdit(); // NEW: Call saveEdit function instead of inline code
        } else if (event.key === "Escape") {
            editPane.remove();
        }
    });
    
    // NEW: Add Enter key listener to category input as well
    editCategoryInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            saveEdit(); // NEW: Pressing Enter in category field also saves
        } else if (event.key === "Escape") {
            editPane.remove(); // NEW: Escape key closes the edit pane
        }
    });
    
    // Close if clicking outside the panel
    editPane.addEventListener("click", function(e) {
        if (e.target === editPane) {
            editPane.remove();
        }
    });
}

// Add delete button functionality and edit functionality to existing cards
for(const card of cards){
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    
    // Add event listener to delete button
    const deleteBtn = card.querySelector(".delete-card-btn");
    if (deleteBtn) {
        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            card.remove();
            saveCards();
        });
    }
    
    // Add click listener for editing
    card.addEventListener("click", function(e) {
        // Don't trigger edit if clicking delete button
        if (!e.target.classList.contains('delete-card-btn')) {
            editCard(card);
        }
    });
}

for(const list of lists){
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}

function dragStart(e){
    e.dataTransfer.setData("text/plain", this.id);
}

function dragEnd(){
    console.log("Drag ended");
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();

    this.classList.add("over");
}

function dragLeave(e){
    this.classList.remove("over");
}

function dragDrop(e){
    const id = e.dataTransfer.getData("text/plain");

    const card = document.getElementById(id);

    this.appendChild(card);

    this.classList.remove("over");

    saveCards();
}

addButton.addEventListener("click", addNewCard);

function addNewCard(){
    //create a mini box asking for the name of the newly added task/card 

    //create a div element called enterNamePane
    const enterNamePane = document.createElement("div");
    enterNamePane.id = "enterNamePane";
    // NEW: Added a second input field for optional category
    enterNamePane.innerHTML = `
        <label for="cardNameInput">Enter Task Name:</label>
        <input type="text" id="cardNameInput" name="cardNameInput">
        <label for="cardCategoryInput" style="margin-top: 15px;">Category (optional):</label>
        <input type="text" id="cardCategoryInput" name="cardCategoryInput" placeholder="e.g., House Task">
    `;
    document.body.appendChild(enterNamePane);

    // Input focus and event listener for Enter key
    const cardNameInput = document.getElementById("cardNameInput");
    // NEW: Get reference to the category input field
    const cardCategoryInput = document.getElementById("cardCategoryInput");
    cardNameInput.focus();
    
    // NEW: Created a separate function to handle form submission
    function submitCard() {
        const cardName = cardNameInput.value.trim();
        // NEW: Get the category value from the input field
        const cardCategory = cardCategoryInput.value.trim();

        if (cardName !== "") {
            // NEW: Pass both cardName and cardCategory to createActualCard
            createActualCard(cardName, cardCategory);
            enterNamePane.remove();     // Clean up the UI
        }
    }
    
    cardNameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            submitCard(); // NEW: Call submitCard function
        }
    });
    
    // NEW: Add Enter key listener to category input field
    cardCategoryInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            submitCard(); // NEW: Pressing Enter in category field also submits
        }
    });

    enterNamePane.addEventListener("click", function(e) {
        if (e.target === enterNamePane) {
            enterNamePane.remove();
        }
    });
}


// NEW: Added second parameter 'cardCategory' with default value of empty string (optional)
function createActualCard(cardName, cardCategory = ''){   
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
        
        // NEW: Only create category span if a category was provided (not empty)
        if (cardCategory && cardCategory.trim() !== '') {
            // NEW: Create a new span element for the category
            const categorySpan = document.createElement("span");
            // NEW: Assign the 'card-category' class for CSS styling
            categorySpan.className = "card-category";
            // NEW: Set the text content to the provided category
            categorySpan.textContent = cardCategory.trim();
            // NEW: Add the category span to the card (appears after task name)
            newCard.appendChild(categorySpan);
        }
        
        // Add delete button
        const deleteBtn = document.createElement("span");
        deleteBtn.className = "delete-card-btn";
        deleteBtn.innerHTML = "X";
        deleteBtn.addEventListener("click", function(e) {
            e.stopPropagation();
            newCard.remove();
            saveCards();
        });
        newCard.appendChild(deleteBtn);


        
        newCard.addEventListener("dragstart", dragStart);
        newCard.addEventListener("dragend", dragEnd);
        
        // Add click listener for editing
        newCard.addEventListener("click", function(e) {
            // Don't trigger edit if clicking delete button
            if (!e.target.classList.contains('delete-card-btn')) {
                editCard(newCard);
            }
        });
        
        const firstList = document.getElementById("list1");
        firstList.appendChild(newCard);

        saveCards();
        
        if (searchInput.value.trim() !== "") {
            filterCards();
        }


   // const cardName = prompt("Enter the name of the new task:");
    /*
    if (cardName && cardName.trim() !== "") {
        cardCounter++;
    
        const newCard = document.createElement("div");
        newCard.className = "card";
        newCard.draggable = true;
        newCard.id = "card" + cardCounter;
        newCard.textContent = cardName.trim();
        
        newCard.addEventListener("dragstart", dragStart);
        newCard.addEventListener("dragend", dragEnd);
        
        const firstList = document.getElementById("list1");
        firstList.appendChild(newCard);
    }
        */
}



window.addEventListener("DOMContentLoaded", loadCards);
