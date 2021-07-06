window.addEventListener("load", function () {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  showNotesFunction();
  // document.getElementById("emptyNote").innerHTML = "";
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
  let title = document.querySelector("#title");
  if (newNote.value != "") {
    notesArr.push([title.value, newNote.value]);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    title.value = "";
    newNote.value = "";
    showNotesFunction();
  } else {
    document.getElementById("emptyNote").innerHTML =
      "<p><b>*</b>Note cannot be empty</p>";
    document.getElementById("emptyNote").style.color = "red";
  }
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
    if (element[1] != "") {
      document.getElementById("emptyNote").innerText = "";
      if (element[0] != "") {
        html += `
        <div class="card noteCard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element[0]}</h5>
        <p class="card-text">${element[1]}</p>
        <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>     
        `;
      } else {
        html += `
        <div class="card noteCard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">Note</h5>
        <p class="card-text">${element[1]}</p>
        <button id=${index} onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
        </div>     
        `;
      }
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
    let cardTitle = card.querySelector("h5").innerText;
    let cardTxt = card.querySelector("p").innerText;
    if (cardTxt.includes(searchVal) || cardTitle.includes(searchVal)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
