const { exec } = require('child_process');

// Define the shell command
const command = 'oemer ./uploads/sheetmusic.png';

// Execute the shell command
exec(command, (error, stdout, stderr) => {
const path = require('path');
const getCmdArgs = () => process.argv.slice(2);
console.log("Calling Oemer");
console.log(getCmdArgs());
const filename = getCmdArgs()[0];

// Define the shell command
// const command = 'echo;

// Execute the shell command
const outputFile = path.dirname(filename.replace("PNG", "XML"));
console.log(outputFile);
postProcessing(filename);
const command = 'oemer ' + filename + " -o" + outputFile;
exec(command, (error, stdout, stderr) => {
  console.log("Wassup bro");
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
}); 
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

function postProcessing(filename) {
  resultArray = filename.split("/");
  filename = resultArray[resultArray.length - 1];
  filename = filename.split(".")[0];
  console.log(filename);
}
