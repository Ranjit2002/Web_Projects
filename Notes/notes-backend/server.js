// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB Compass
mongoose.connect('mongodb://127.0.0.1:27017/notes_app')
    .then(() => console.log("Connected to MongoDB Compass"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Note Schema & Model
const noteSchema = new mongoose.Schema({
    title: String,
    content: String,
});
const Note = mongoose.model('Note', noteSchema);

// --- API Routes ---

// Get all notes
app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

// Create a new note
app.post('/api/notes', async (req, res) => {
    const newNote = new Note(req.body);
    const savedNote = await newNote.save();
    res.json(savedNote);
});

// Update a note
app.put('/api/notes/:id', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
});

// Delete a note
app.delete('/api/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));