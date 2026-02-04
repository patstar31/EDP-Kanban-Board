const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("AddCardButton");
const deleteButton= document.getElementById("DeleteCardButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cardCounter = 0; // Counter for dynamically created cards

function saveCards() {
    const data = [...document.querySelectorAll(".card")].map(card => {
        // Get text from card-text span or fallback to textContent
        const textSpan = card.querySelector('.card-text');
        const text = textSpan ? textSpan.textContent.trim() : card.textContent.replace('×', '').trim();
        return {
            id: card.id,
            text: text,
            listId: card.parentElement.id
        };
    });
    localStorage.setItem("kanbanCards", JSON.stringify(data));
}

function loadCards() {
    const data = JSON.parse(localStorage.getItem("kanbanCards") || "[]");

    document.querySelectorAll(".card").forEach(card => card.remove());

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

searchInput.addEventListener("input", filterCards);
categoryFilter.addEventListener("change", filterCards);

// Function to edit a card
function editCard(card) {
    // Create edit panel
    const editPane = document.createElement("div");
    editPane.id = "editNamePane";
    
    // Get current card text
    const textSpan = card.querySelector('.card-text');
    const currentText = textSpan ? textSpan.textContent.trim() : card.textContent.replace('×', '').trim();
    
    editPane.innerHTML = `
        <label for="editCardInput">Edit Task Name:</label>
        <input type="text" id="editCardInput" name="editCardInput" value="${currentText}">
    `;
    document.body.appendChild(editPane);

    // Focus and select all text for easy editing
    const editInput = document.getElementById("editCardInput");
    editInput.focus();
    editInput.select();
    
    // Handle Enter key to save
    editInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const newName = editInput.value.trim();
            
            if (newName !== "") {
                // Update the card text
                if (textSpan) {
                    textSpan.textContent = newName;
                }
                saveCards();
                editPane.remove();
            }
        } else if (event.key === "Escape") {
            // Cancel on Escape key
            editPane.remove();
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
    enterNamePane.innerHTML = `
        <label for="cardNameInput">Enter Task Name:</label>
        <input type="text" id="cardNameInput" name="cardNameInput">
    `;
    document.body.appendChild(enterNamePane);

    // Input focus and event listener for Enter key
    const cardNameInput = document.getElementById("cardNameInput");
    cardNameInput.focus();
    cardNameInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const cardName = cardNameInput.value.trim();

            if (cardName !== "") {
                createActualCard(cardName); // Call a separate function to build the card
                enterNamePane.remove();     // Clean up the UI
            }
        }
    });
}


function createActualCard(cardName){   
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
        deleteBtn.innerHTML = "×";
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
