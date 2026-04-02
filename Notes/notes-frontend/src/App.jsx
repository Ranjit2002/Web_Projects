// src/App.jsx
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      if (editingId) {
        await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      }

      closeAndResetModal();
      fetchNotes();
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note._id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const closeAndResetModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 font-sans transition-colors duration-500 ${theme === "dark" ? "bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-black" : "bg-slate-50 text-slate-900 selection:bg-amber-300 selection:text-black"}`}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mb-10 sm:mb-16 gap-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-400 via-sky-500 to-indigo-400 bg-clip-text text-transparent pb-2 leading-relaxed tracking-tight text-center md:text-left">
            My Streamlined Notes
          </h1>

          <div className="flex gap-3 sm:gap-4 items-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-500 font-bold rounded-2xl px-5 py-3 sm:px-6 sm:py-3.5 text-slate-950 transition-all duration-300 hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 shadow-lg text-sm sm:text-base whitespace-nowrap"
            >
              <span className="text-xl sm:text-2xl leading-none font-light">
                +
              </span>{" "}
              Add Note
            </button>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-3 sm:p-3.5 rounded-2xl font-bold transition-all duration-500 active:scale-90 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 hover:rotate-12 shadow-lg ${theme === "dark" ? "bg-slate-800 text-amber-400 hover:bg-slate-700 border border-slate-700" : "bg-white text-amber-500 hover:bg-slate-100 border border-slate-200"}`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </div>
        </div>

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-opacity">
            <div
              className={`relative w-full max-w-lg p-6 sm:p-8 rounded-3xl sm:rounded-[2rem] shadow-2xl border transition-colors duration-300 ${theme === "dark" ? "bg-slate-900 border-slate-700/50 shadow-black/50" : "bg-white border-slate-200 shadow-slate-300/50"}`}
            >
              <button
                onClick={closeAndResetModal}
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300 ${theme === "dark" ? "text-slate-400 hover:text-rose-400 hover:bg-slate-800 hover:rotate-90" : "text-slate-500 hover:text-rose-500 hover:bg-slate-100 hover:rotate-90"}`}
              >
                ✕
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 tracking-tight pr-8">
                {editingId ? "Edit Note" : "New Note"}
              </h2>

              <form onSubmit={handleSubmit} className="w-full flex flex-col">
                <input
                  type="text"
                  placeholder="Enter Note Title" // Updated Placeholder
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full border rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-lg sm:text-xl font-semibold shadow-inner ${theme === "dark" ? "bg-slate-950/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                />
                <textarea
                  placeholder="Start typing your note here..." // Updated Placeholder
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`w-full border rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-6 sm:mb-8 h-40 sm:h-56 resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-base sm:text-lg leading-relaxed shadow-inner ${theme === "dark" ? "bg-slate-950/50 border-slate-700 text-white placeholder-slate-600" : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"}`}
                />

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 font-bold rounded-xl sm:rounded-2xl p-3 sm:p-4 text-slate-950 transition-all duration-300 hover:from-orange-400 hover:to-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:-translate-y-1 active:translate-y-0 active:scale-95 text-base sm:text-lg shadow-lg"
                >
                  {editingId ? "Save Changes" : "Create Note"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Empty State OR Notes Grid */}
        {notes.length === 0 ? (
          <div
            className={`w-full flex flex-col items-center justify-center py-20 sm:py-32 rounded-[2rem] sm:rounded-[2.5rem] border-2 border-dashed px-4 text-center ${theme === "dark" ? "border-slate-800 bg-slate-900/30 text-slate-400" : "border-slate-300 bg-slate-100/50 text-slate-500"}`}
          >
            <span className="text-5xl sm:text-6xl mb-4 sm:mb-6 opacity-80">
              📝
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              No notes yet
            </h2>
            <p className="text-base sm:text-lg opacity-75">
              Click the "Add Note" button to capture your first brilliant idea.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
            {notes.map((note) => (
              <div
                key={note._id}
                className={`group p-6 sm:p-8 rounded-3xl sm:rounded-[2.5rem] shadow-xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 sm:hover:-translate-y-2 flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] relative overflow-hidden ${theme === "dark" ? "bg-slate-900 border-slate-800 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] hover:border-cyan-500/40" : "bg-white border-slate-200 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] hover:border-cyan-400/60"}`}
              >
                {/* Subtle top accent line - REMOVED AS REQUESTED */}

                <div className="mb-6 sm:mb-8 relative z-10 flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 group-hover:text-cyan-500 transition-colors break-words tracking-tight">
                    {note.title}
                  </h3>
                  <p
                    className={`whitespace-pre-wrap leading-relaxed line-clamp-6 sm:line-clamp-8 text-sm sm:text-base ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}
                  >
                    {note.content}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 sm:gap-4 mt-auto relative z-10 pt-4">
                  <button
                    onClick={() => handleEdit(note)}
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-white transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] hover:-translate-y-0.5 active:scale-95 shadow-md text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-bold text-white transition-all duration-300 hover:from-rose-500 hover:to-red-500 hover:shadow-[0_0_20px_rgba(225,29,72,0.6)] hover:-translate-y-0.5 active:scale-95 shadow-md text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
