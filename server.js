const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3002;

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    console.log('Upload path:', uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ['.png', '.pdf', '.docx'];

    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PNG, PDF, and DOCX files are allowed.'));
    }
  },
});

// Serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'uploads', req.file.originalname);
    console.log('File path:', filePath);

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`File content: ${fileContent}`);

    res.json({ success: true, message: 'File uploaded and processed successfully!', fileContent });
  } catch (error) {
    console.error('Error processing file:', error.message);
    res.status(500).json({ success: false, message: 'Error processing file: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});