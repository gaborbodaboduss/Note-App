const btnEl = document.getElementById("btn"); 
const appEl = document.getElementById("app");

getNotes().forEach((note) => {
    const noteEl = createNoteElement(note.id, note.content);
    appEl.insertBefore(noteEl, btnEl);
})

function createNoteElement(id, content){
    const element = document.createElement("textarea");
    element.classList.add("note");
    element.placeholder = "empty note";
    element.value = content;

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do you want to delete this note?");
        if(warning){
            deleteNote(id, element);
        }
    });
    element.addEventListener("input", () => {
        updateNote(id, element.value);
    });

    return element;
}

function deleteNote(id, element){
    element.remove();
    const notes = getNotes();
    notes.splice(notes.indexOf(id), 1);
    saveNote(notes);
}

function updateNote(id, content){
    const notes = getNotes();
    const target = notes.filter((note) => note.id === id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote(){
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    };
    const noteEl = createNoteElement(noteObject.id, noteObject.content);
    appEl.insertBefore(noteEl, btnEl);

    notes.push(noteObject);

    saveNote(notes);
}

function saveNote(notes){
    localStorage.setItem("notes", JSON.stringify(notes));
};

function getNotes(){
    const notes = JSON.parse(localStorage.getItem("notes"));
    if(!notes){
        return [];
    }
    return notes;
}


btnEl.addEventListener("click", addNote);