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
    let obj;
    if (title.value != "") {
      obj = {
        title: title.value,
        text: newNote.value,
        favourite: false,
      };
    } else {
      obj = {
        title: "Note",
        text: newNote.value,
        favourite: false,
      };
    }
    notesArr.push(obj);
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
    if (element.text != "") {
      document.getElementById("emptyNote").innerText = "";
      if (element.title != "") {
        html += `
        <div class="card noteCard" style="width: 18rem;">
        <div class="card-body">
        <h5 class="card-title">${element.title}
        <i id=${index} class="far fa-star unselectedStar" onclick="favourite(this.id)"></i>
        <i id=${index} class="fas fa-star selectedStar" onclick="favourite(this.id)"></i>
        </h5>
        <p class="card-text">${element.text}</p>
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
  const selectedStars = document.querySelectorAll(".selectedStar");
  const unselectedStars = document.querySelectorAll(".unselectedStar");
  notesArr.forEach((note, index) => {
    if (note.favourite == true) {
      selectedStars[index].style.display = "block";
      unselectedStars[index].style.display = "none";
    } else {
      unselectedStars[index].style.display = "block";
      selectedStars[index].style.display = "none";
    }
  });
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
  let searchVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach((card) => {
    let cardTitle = card.querySelector("h5").innerText.toLowerCase();
    let cardTxt = card.querySelector("p").innerText.toLowerCase();
    if (cardTxt.includes(searchVal) || cardTitle.includes(searchVal)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Adding to favorite
function favourite(index) {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArr = [];
  } else {
    notesArr = JSON.parse(notes);
  }
  const selectedStars = document.querySelectorAll(".selectedStar");
  const unselectedStars = document.querySelectorAll(".unselectedStar");
  const favNote = notesArr[index];
  favNote.favourite = !favNote.favourite;
  localStorage.setItem("notes", JSON.stringify(notesArr));
  if (favNote.favourite == true) {
    selectedStars[index].style.display = "block";
    unselectedStars[index].style.display = "none";
  } else if (favNote.favourite == false) {
    selectedStars[index].style.display = "none";
    unselectedStars[index].style.display = "block";
  }
}
