// // runPython.js

// const { exec } = require('child_process');
// console.log("Yay")

// // Define the command to execute the Python file
// const pythonCommand = 'python3 braille.py';
// console.log("yay")
// // Execute the Python file using child_process.exec
// exec(pythonCommand, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`Error executing Python file: ${error}`);
//         return;
//     }

//     console.log(`Python stdout: ${stdout}`);
//     console.error(`Python stderr: ${stderr}`);

// console.log("yay")
// });

// runPython.js

const { spawn } = require('child_process');

// Define the command to execute the Python script with arguments
const pythonProcess = spawn('python', ['braille.py', "twinkle.musicxml"]);

// Listen for data returned from the Python script
pythonProcess.stdout.on('data', (data) => {
    console.log(`Data returned from Python script: ${data}`);
    // Do something with the data returned from the Python script
});

// Handle errors from the Python process
pythonProcess.stderr.on('data', (data) => {
    console.error(`Error from Python script: ${data}`);
});

// Handle process exit
pythonProcess.on('exit', (code) => {
    if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
    } else {
        console.log('Python script executed successfully');
    }
});