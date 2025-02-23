const notesTitle = document.getElementById('notes-title');
const notesDesc = document.getElementById('notes-desc');
const addButton = document.getElementById('add-btn');
const notesMain = document.getElementById('notes-container');

const parsedData = JSON.parse(localStorage.getItem('notes'));
let notes;

if (parsedData?.length > 0){
    notes = [...parsedData]
    renderNotes(notes);
}else{
    notes = [];
}

addButton.addEventListener('click', () => {
    const title = notesTitle.value.trim();
    const desc = notesDesc.value.trim();

    if (!title || !desc) return;

    notes = [...notes, {id: Date.now(), title, desc }]
    localStorage.setItem('notes', JSON.stringify(notes))
    notesTitle.value = '';
    notesDesc.value = '';
    console.log(notes)
    renderNotes(notes);
});

function deleteNote(note){
    notes = notes.filter(ele => ele.id !== note.id);
    localStorage.setItem('notes', JSON.stringify(notes))
    renderNotes(notes);
}



function renderNotes (notes){
    notesMain.innerHTML = ''
    notes.forEach(note => {
        /** Creating notes container */
        const notesContainer = document.createElement('div');
        notesContainer.classList.add('notes-section');

        /** creating notes title element */
        const noteTitle = document.createElement('p');
        noteTitle.classList.add('title');
        noteTitle.innerText = note.title;
        
        /** creating notes desc element */
        const noteDesc = document.createElement('p');
        noteDesc.classList.add('desc');
        noteDesc.innerText = note.desc;

        /** creting delete button */
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';

        notesContainer.appendChild(noteTitle);
        notesContainer.appendChild(noteDesc);
        notesContainer.appendChild(deleteButton);

        notesMain.appendChild(notesContainer);

        deleteButton.addEventListener('click', () => {
            deleteNote(note)
        })
    })
}
