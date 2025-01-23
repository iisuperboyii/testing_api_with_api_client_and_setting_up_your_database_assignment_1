const express = require('express');
const { resolve } = require('path');
const app = express();
const port = 3010;

// Middleware to serve static files and parse JSON requests
app.use(express.static('static'));
app.use(express.json()); // Middleware for parsing JSON bodies

// Sample JSON data of students
const students = [
    {
        student_id: "1",
        name: "Alice Johnson",
        marks: {
            math: 85,
            science: 90,
            english: 78,
            history: 88,
            geography: 92
        },
        total: 433
    },
    {
        student_id: "2",
        name: "Bob Smith",
        marks: {
            math: 72,
            science: 68,
            english: 80,
            history: 75,
            geography: 85
        },
        total: 380
    },
    {
        student_id: "3",
        name: "Charlie Davis",
        marks: {
            math: 88,
            science: 84,
            english: 82,
            history: 90,
            geography: 71
        },
        total: 415
    }
];

// Serve the index page
app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// API Endpoint: Retrieve students above a specified threshold
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body; // Extract threshold from request body

    // Validate input
    if (typeof threshold !== 'number') {
        return res.status(400).json({ error: "'threshold' must be a number" });
    }

    // Filter students whose total marks exceed the threshold
    const filteredStudents = students.filter(student => student.total > threshold);

    // Prepare and send response
    res.json({
        count: filteredStudents.length,
        students: filteredStudents.map(student => ({
            name: student.name,
            total: student.total
        }))
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});