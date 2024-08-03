const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");


function showNotes(){
  notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

function updateStorage(){
  localStorage.setItem("notes",notesContainer.innerHTML);
}


function selectNote(e) {
  if (e.target.classList.contains("input-box")) {
    // Remove border from all notes
    notes = document.querySelectorAll(".input-box");
    notes.forEach(note => note.style.border = "0px");
    // Add border to the selected note
    e.target.style.border = "5px solid #9418fd";
    updateStorage();
  }
}

createBtn.addEventListener("click",()=> {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className="input-box";
  inputBox.setAttribute("contenteditable","true");
  img.src = "images/delete.png";
  notesContainer.appendChild(inputBox).appendChild(img);
  updateStorage();
})

notesContainer.addEventListener("click",function(e){
  if(e.target.tagName === "IMG"){
    e.target.parentElement.remove();
    updateStorage();
  }
  else if (e.target.tagName === "p"){
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function(){
        updateStorage();
      }
    })
  }

  selectNote(e);
})


document.addEventListener("keydown",event=>{
  if(event.key === "Enter"){
    document.execCommand("insertLineBreak");
    event.preventDefault();
  }
  updateStorage();
})