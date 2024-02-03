const { exec } = require('child_process');

// Define the shell command
const command = 'oemer ./uploads/sheetmusic.png';

// Execute the shell command
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});