// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer'); // Nodemailer added to the top!

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bandmitra')
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.error("Could not connect to MongoDB:", err));

// --- 1. BAND SCHEMA & ROUTES ---
const bandSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    registeredDate: { type: Date, default: Date.now }
});
const Band = mongoose.model('Band', bandSchema);

app.post('/api/bands', async (req, res) => {
    try {
        const newBand = new Band(req.body);
        const savedBand = await newBand.save();
        res.status(201).json({ message: "Band registered successfully!", band: savedBand });
    } catch (error) {
        res.status(500).json({ message: "Error saving to database", error: error.message });
    }
});

app.get('/api/bands', async (req, res) => {
    try {
        const bands = await Band.find();
        res.status(200).json(bands);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bands", error: error.message });
    }
});

// --- 2. BOOKING SCHEMA & ROUTES ---
const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    eventDate: { type: String, required: true },
    eventTime: { type: String, required: true },
    venueAddress: { type: String, required: true },
    bandName: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
});
const Booking = mongoose.model('Booking', bookingSchema);

app.post('/api/bookings', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json({ message: "Booking confirmed successfully!", booking: savedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error saving booking", error: error.message });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        // .sort({ bookingDate: -1 }) brings the newest bookings to the top
        const bookings = await Booking.find().sort({ bookingDate: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
});

// --- 3. CONTACT MESSAGE SCHEMA & ROUTES (WITH EMAIL) ---
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now }
});
const Message = mongoose.model('Message', messageSchema);

// Configure the Email Postman (Nodemailer) - SECURE VERSION
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // Forces a secure SSL connection
    auth: {
        user: 'vishwakarmaranjit8109@gmail.com',
        pass: 'wfyadziihydslwvx'
    }
});



app.post('/api/messages', async (req, res) => {
    try {
        // 1. Save the message to MongoDB
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // 2. Draft the email
        const mailOptions = {
            from: 'vishwakarmaranjit8109@gmail.com',
            to: 'vishwakarmaranjit8109@gmail.com',
            subject: `BandMitra Inquiry: New message from ${req.body.name}`,
            text: `You have a new message from the BandMitra Contact Form!\n\nName: ${req.body.name}\nEmail: ${req.body.email}\n\nMessage:\n${req.body.message}`
        };

        // 3. Send the email
        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: true, data: savedMessage });
    } catch (error) {
        console.error("Email/DB Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find().sort({ submittedAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});