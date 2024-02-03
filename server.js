const express = require('express');
<<<<<<< HEAD
const {spawn} = require('child_process')
=======
const {exec} = require('child_process');
>>>>>>> 9f0f509 (Co-authored-by: Mehul Goel <mehulgoel873@users.noreply.github.com>)
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
<<<<<<< HEAD
const port = 62919;
=======
const port = 3007;
>>>>>>> 9f0f509 (Co-authored-by: Mehul Goel <mehulgoel873@users.noreply.github.com>)

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'PNG/');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    console.log('Upload path:', uploadPath);
    console.log(file.originalname);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = ['.png', '.pdf', '.docx', '.heic', '.jpg'];

    const fileExt = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      print(file.path);
      cb(new Error('Invalid file type. Only PNG, PDF, DOCX, HEIC, and JPG files are allowed.'));
    }
  },
});

app.get('/', (req, res) => {
  var dataToSend = '';
  const python = spawn('python3', ['braille.py']);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend += data.toString();  // Concatenate data to handle multiple chunks
  });

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
  });

  res.sendFile(path.join(__dirname, 'index.html'));
});
app.listen(port, () => console.log('Example app listening on port ${port}!)'))
// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded.');
    }

    const filePath = path.join(__dirname, 'PNG', req.file.originalname);
    console.log('dddd');
    console.log('File path:', filePath);

    //const fileContent = fs.readFileSync(filePath, 'utf-8');
    //console.log(`File content: ${fileContent}`);
    console.log('dddd');
    exec('node TheShit.js ' + filePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing TheShit.js: ${error}`);
        return res.status(500).json({ success: false, message: 'Error executing TheShit.js.' });
      }
      
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      // res.json({ success: true, message: 'File uploaded and processed successfully!' });
      webScrapeExec();
    });
    console.log('Finished');

    function webScrapeExec() {
      const outputFilePath = filePath.replace("PNG", "XML").replace(".png", ".musicxml");
      console.log("\n");
      console.log(outputFilePath);
      exec('node hi.js ' + outputFilePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing hi.js: ${error}`);
          return res.status(500).json({ success: false, message: 'Error executing hi.js.' });
        }
  
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        res.json({ success: true, message: 'File uploaded and processed successfully!' });
      });
    }
    
  } 
  
  
  catch (error) {
    console.error('Error processing file:', error.message);
    res.status(500).json({ success: false, message: 'Error processing fileefef: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});