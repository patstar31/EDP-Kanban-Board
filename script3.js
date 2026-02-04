const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
const addButton = document.getElementById("AddCardButton");
const deleteButton= document.getElementById("DeleteCardButton");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
let cardCounter = 3; // Assuming there are initially 3 cards

function saveCards() {
    const data = [...document.querySelectorAll(".card")].map(card => ({
        id: card.id,
        text: card.textContent,
        listId: card.parentElement.id
    }));
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
        card.textContent = text;
        card.addEventListener("dragstart", dragStart);
        card.addEventListener("dragend", dragEnd);

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
        const cardText = card.textContent.toLowerCase();
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

for(const card of cards){
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
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
    const enterNamePane = document.createElement("div");
    enterNamePane.id = "enterNamePane";
    enterNamePane.innerHTML = `
        <label for="cardNameInput">Enter Task Name:</label>
        <input type="text" id="cardNameInput" name="cardNameInput">
    `;
    document.body.appendChild(enterNamePane);
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
        newCard.textContent = cardName.trim();
        
        newCard.addEventListener("dragstart", dragStart);
        newCard.addEventListener("dragend", dragEnd);
        
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

deleteButton.addEventListener("click", deleteCard);

function deleteCard(){
    saveCards();
}

window.addEventListener("DOMContentLoaded", loadCards);
