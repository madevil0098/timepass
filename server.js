const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Set up multer to handle multipart/form-data (file uploads)
const upload = multer({ dest: 'uploads/' });

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Endpoint to handle photo uploads
app.post('/api/upload_photo', upload.single('photo'), (req, res) => {
    try {
        // Get the uploaded photo file
        const photo = req.file;

        // Move the photo to a desired location (you can customize this)
        fs.renameSync(photo.path, `uploads/${photo.originalname}`);

        res.status(200).json({ message: 'Photo uploaded successfully' });
    } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

