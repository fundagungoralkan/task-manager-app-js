const addBtn = document.getElementById('subscribe-btn');
const popupBox = document.querySelector('.popup-box');
const popup = document.querySelector('.popup');
const closeBtn = document.getElementById('close-popup');
const noteForm = document.getElementById('note-form');
const notesWrapper = document.querySelector('.notes-wrapper');

let editNote = null;

// Popup aç -> buton gizle
addBtn.addEventListener('click', () => {
  popupBox.classList.add('show');
  popup.classList.add('show');
  noteForm.reset();
  document.getElementById('popup-title').textContent = 'New Note';
  addBtn.style.display = 'none';
});

// Popup kapat -> buton göster
closeBtn.addEventListener('click', () => {
  popupBox.classList.remove('show');
  popup.classList.remove('show');
  editNote = null;
  addBtn.style.display = 'inline-block';
});

// Not ekleme / düzenleme
noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const desc = document.getElementById('description').value;

  if(editNote){
    editNote.querySelector('.details h2').textContent = title;
    editNote.querySelector('.details p').textContent = desc;
    // Menüyi kapat
    const settings = editNote.querySelector('.settings');
    if(settings.classList.contains('show')) settings.classList.remove('show');
    editNote = null;
  } else {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <div class="details">
        <h2>${title}</h2>
        <p>${desc}</p>
      </div>
      <div class="bottom">
        <p>${new Date().toLocaleDateString()}</p>
        <div class="settings">
          <i class="bx bx-dots-horizontal-rounded"></i>
          <ul class="menu">
            <li class="edit-icon"><i class="bx bx-edit"></i> Edit</li>
            <li class="delete-icon"><i class="bx bx-trash"></i> Delete</li>
          </ul>
        </div>
      </div>
    `;
    notesWrapper.appendChild(noteDiv);
  }

  noteForm.reset();
  popupBox.classList.remove('show');
  popup.classList.remove('show');
  addBtn.style.display = 'inline-block';
});

// Settings menüsü ve edit/delete
notesWrapper.addEventListener('click', (e) => {
  const menuBtn = e.target.closest('.bx-dots-horizontal-rounded');
  if(menuBtn){
    const settings = menuBtn.parentElement;
    settings.classList.toggle('show');
  }

  const deleteBtn = e.target.closest('.delete-icon');
  if(deleteBtn){
    const note = deleteBtn.closest('.note');
    // Menü açıksa kapat
    const settings = note.querySelector('.settings');
    if(settings.classList.contains('show')) settings.classList.remove('show');
    note.remove();
  }

  const editBtn = e.target.closest('.edit-icon');
  if(editBtn){
    editNote = editBtn.closest('.note');
    const settings = editNote.querySelector('.settings');
    if(settings.classList.contains('show')) settings.classList.remove('show');

    document.getElementById('title').value = editNote.querySelector('h2').textContent;
    document.getElementById('description').value = editNote.querySelector('p').textContent;
    document.getElementById('popup-title').textContent = 'Edit Note';
    popupBox.classList.add('show');
    popup.classList.add('show');
    addBtn.style.display = 'none';
  }
});