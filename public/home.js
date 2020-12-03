let toDoButton = document.getElementById('to-do-add-button');
let toDoContainer = document.getElementById('to-do-container');
let inputField = document.getElementById('input');

toDoButton.addEventListener('click', () => {
    var paragraph = document.createElement('p');
    paragraph.innerText = inputField.value;
    toDoContainer.appendChild(paragraph);
});