const express = require('express');
const {exec} = require('child_process');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3008;
var xml = "";
var txt = "";

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

app.get('/TXT',function(req,res) {
  console.log('TXT File Download');
  if (txt != "") {
    // Download function provided by express
    res.download(txt, function(err) {
        if(err) {
            console.log(err);
        }
    })
  }
  console.log(txt);
})

app.get('/XML',function(req,res) {
  console.log('XML file download');
   
  // Download function provided by express
  if (xml != "") {
    res.download(xml, function(err) {
        if(err) {
            console.log(err);
        }
    })
  }
  console.log(xml);
})

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
      xml = outputFilePath;
      exec('node hi.js ' + outputFilePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing hi.js: ${error}`);
          return res.status(500).json({ success: false, message: 'Error executing hi.js.' });
        }
        txt = xml.replace("XML", "BRL").replace(".musicxml", "_brl.txt");
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
        //res.json({ success: true, message: 'File uploaded and processed successfully!' });
      });
    }
    
  } 
  
  
  catch (error) {
    console.error('Error processing file:', error.message);
    var error = "Error processing file: " + error.message
    // res.send(<script>alert("You need to upload a correct error!"); window.location.href = "/page_location"; </script>);
    // alert("'Error processing fileefef: ' + error.message ");
    res.status(500).json({ success: false, message: 'Error processing fileefef: ' + error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});