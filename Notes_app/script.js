document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const noteDialog = document.getElementById('noteDialog');
    const noteForm = document.getElementById('noteForm');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const dialogTitle = document.getElementById('dialogTitle');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let editingNoteId = null;

    renderNotes();
    applyTheme();

    document.querySelector('.add-note-btn').addEventListener('click', () => openNoteDialog());
    document.querySelector('.close-btn').addEventListener('click', closeNoteDialog);
    document.querySelector('.cancel-btn').addEventListener('click', closeNoteDialog);
    themeToggleBtn.addEventListener('click', toggleTheme);

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = noteTitleInput.value.trim();
        const content = noteContentInput.value.trim();

        if (title && content) {
            editingNoteId ? updateNote(editingNoteId, title, content) : addNote(title, content);
            closeNoteDialog();
        }
    });

    noteDialog.addEventListener('click', (e) => {
        if (e.target === noteDialog) closeNoteDialog();
    });

    function renderNotes() {
        notesContainer.innerHTML = '';

        if (notes.length === 0) {
            notesContainer.innerHTML = `
                        <div class='col-span-full flex flex-col items-center text-center py-20 gap-3'>
                            <p class='text-gray-600 dark:text-gray-300 text-lg'>No notes yet. Add one!</p>
                            <button class='empty-state-btn bg-blue-600 hover:bg-blue-700
                                text-white px-4 py-2 rounded-lg shadow'>
                                + Add Your First Note
                            </button>
                        </div>
                    `;
            document.querySelector('.empty-state-btn')
                ?.addEventListener('click', () => openNoteDialog());
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className =
                "bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-300 " +
                "dark:border-gray-700 shadow hover:shadow-lg transition flex flex-col justify-between";

            card.innerHTML = `
                        <div>
                            <h3 class='text-lg font-semibold'>${escapeHtml(note.title)}</h3>
                            <p class='text-gray-600 dark:text-gray-300 mt-1 whitespace-pre-line'>
                                ${escapeHtml(note.content)}
                            </p>
                        </div>

                        <div class='flex justify-between items-center mt-4'>
                            <span class='text-xs text-gray-500 dark:text-gray-400'>
                                ${new Date(note.createdAt).toLocaleDateString()}
                            </span>

                            <div class='flex gap-2'>
                                <button class='edit-btn px-3 py-1 bg-yellow-400 rounded-lg' data-id='${note.id}'>✏️</button>
                                <button class='delete-btn px-3 py-1 bg-red-500 text-white rounded-lg' data-id='${note.id}'>🗑️</button>
                            </div>
                        </div>
                    `;
            notesContainer.appendChild(card);
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.onclick = () => openNoteDialog(parseInt(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.onclick = () => deleteNote(parseInt(btn.dataset.id));
        });
    }

    function addNote(title, content) {
        notes.unshift({
            id: Date.now(),
            title,
            content,
            createdAt: new Date().toISOString()
        });
        saveNotes();
        renderNotes();
    }

    function updateNote(id, title, content) {
        notes = notes.map(n => n.id === id ? { ...n, title, content } : n);
        saveNotes();
        renderNotes();
    }

    function deleteNote(id) {
        notes = notes.filter(n => n.id !== id);
        saveNotes();
        renderNotes();
    }

    function saveNotes() {
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function openNoteDialog(id = null) {
        editingNoteId = id;
        if (id) {
            const note = notes.find(n => n.id === id);
            noteTitleInput.value = note.title;
            noteContentInput.value = note.content;
            dialogTitle.textContent = "Edit Note";
        } else {
            noteForm.reset();
            dialogTitle.textContent = "Add New Note";
        }
        noteDialog.showModal();
    }

    function closeNoteDialog() {
        noteDialog.close();
        noteForm.reset();
        editingNoteId = null;
    }

    function toggleTheme() {
        document.documentElement.classList.toggle("dark");
        const isDark = document.documentElement.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        themeToggleBtn.textContent = isDark ? "☀️" : "🌙";
    }

    function applyTheme() {
        const saved = localStorage.getItem("theme") || "light";
        document.documentElement.classList.toggle("dark", saved === "dark");
        themeToggleBtn.textContent = saved === "dark" ? "☀️" : "🌙";
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});