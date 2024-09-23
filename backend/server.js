const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mernDatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Simple schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { 
        type: String, 
        unique: true, // This ensures email is unique
        required: true 
    },
    age: Number
});

const User = mongoose.model('User', userSchema);

// POST route to save data
app.post('/api/user', async (req, res) => {
    const { name, email, age } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send('This email has already been registered');
        }

        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).send('User saved!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving user');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

