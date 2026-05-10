document.addEventListener('DOMContentLoaded', () => {
    const notesContainer = document.getElementById('notesContainer');
    const noteDialog = document.getElementById('noteDialog');
    const noteForm = document.getElementById('noteForm');
    const noteTitleInput = document.getElementById('noteTitle');
    const noteContentInput = document.getElementById('noteContent');
    const dialogTitle = document.getElementById('dialogTitle');
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    // Added a safety check to ensure localStorage always returns an array
    let parsedNotes = JSON.parse(localStorage.getItem('notes'));
    let notes = Array.isArray(parsedNotes) ? parsedNotes : [];
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

        // Prevent silent failure if user types only spaces
        if (!title || !content) {
            alert("Title and content cannot be completely empty.");
            return;
        }

        editingNoteId ? updateNote(editingNoteId, title, content) : addNote(title, content);
        closeNoteDialog();
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
                        text-white px-4 py-2 rounded-lg shadow transition'>
                        + Add Your First Note
                    </button>
                </div>
            `;
            // Scoped correctly
            notesContainer.querySelector('.empty-state-btn')?.addEventListener('click', () => openNoteDialog());
            return;
        }

        notes.forEach(note => {
            const card = document.createElement('div');
            card.className =
                "bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-300 " +
                "dark:border-gray-700 shadow hover:shadow-lg transition flex flex-col justify-between min-h-[250px]";

            card.innerHTML = `
                <div>
                    <h3 class='text-xl font-semibold'>${escapeHtml(note.title)}</h3>
                    <p class='text-gray-600 dark:text-gray-300 mt-2 whitespace-pre-line'>
                        ${escapeHtml(note.content)}
                    </p>
                </div>

                <div class='flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <span class='text-xs text-gray-500 dark:text-gray-400'>
                        ${new Date(note.createdAt).toLocaleDateString()}
                    </span>

                    <div class='flex gap-2'>
                        <button class='edit-btn px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg transition hover:bg-yellow-500' data-id='${note.id}'>✏️</button>
                        <button class='delete-btn px-3 py-1 bg-red-500 text-white rounded-lg transition hover:bg-red-600' data-id='${note.id}'>🗑️</button>
                    </div>
                </div>
            `;
            notesContainer.appendChild(card);
        });

        // Fixed scoping: only search INSIDE notesContainer to prevent global button hijacking
        notesContainer.querySelectorAll('.edit-btn').forEach(btn => {
            // Using Number() instead of parseInt() for safer timestamp parsing
            btn.addEventListener('click', () => openNoteDialog(Number(btn.dataset.id)));
        });

        notesContainer.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteNote(Number(btn.dataset.id)));
        });
    }

    // Listen for keystrokes in the textarea
    noteContentInput.addEventListener('keydown', (e) => {
        // Check if the key is 'Enter' AND the 'Shift' key is NOT being held down
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Stop it from creating a new line

            // Programmatically submit the form (this respects your 'required' attributes)
            noteForm.requestSubmit();
        }
    });

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
            if (note) { // Safety check added
                noteTitleInput.value = note.title;
                noteContentInput.value = note.content;
                dialogTitle.textContent = "Edit Note";
            }
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
        if (!text) return ""; // Prevent null errors
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});