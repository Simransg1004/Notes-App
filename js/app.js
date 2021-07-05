window.addEventListener("load", function () {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  showNotesFunction();
  document.getElementById("emptyNote").innerHTML = "";
});

// if user adds a note, then add it to LocalStorage
let addNote = document.querySelector("#addNote");

addNote.addEventListener("click", function (e) {
  let newNote = document.querySelector("#newNote");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  notesArr.push(newNote.value);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  newNote.value = "";
  showNotesFunction();
});

// Displaying Notes
function showNotesFunction() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  let html = "";
  notesArr.forEach((element, index) => {
    if (element != "") {
      document.getElementById("emptyNote").innerText = "";
      html += `
      <div class="card noteCard" style="width: 18rem;">
      <div class="card-body">
      <h5 class="card-title">Note ${index + 1}</h5>
      <p class="card-text">${element}</p>
      <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
      </div>
      </div>     
      `;
    } else {
      document.getElementById("emptyNote").innerHTML =
        "<p><b>*</b>Note cannot be empty</p>";
      document.getElementById("emptyNote").style.color = "red";
    }
  });
  let showNotes = document.querySelector(".showNotes");
  if (notesArr.length != 0) {
    showNotes.innerHTML = html;
  } else {
    showNotes.innerHTML = `Oops! Nothing to show here.`;
  }
}

// Notes to be deleted
function deleteNote(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  notesArr.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesArr));
  showNotesFunction();
}

// Notes to be searched
let search = document.querySelector("#search");
search.addEventListener("input", function () {
  let searchVal = search.value;
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((card) => {
    let cardTxt = card.querySelector("p").innerText;
    if (cardTxt.includes(searchVal)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
