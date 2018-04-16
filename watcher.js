const fs = require('fs');
const path = require('path');
const os = require('os');

// Change the documents to whatever folder you want to monitor
const dir = path.join(__dirname, 'documents');
const files = fs.readdirSync(dir);
const username = os.userInfo().username;

const logMessage = (message) =>
  console.log(`${new Date().toUTCString()}: ` + username + ' ' + message);

fs.watch(dir, (eventType, file) => {
  if (eventType === 'rename') {
    const index = files.indexOf(file);
    if (index >=0) {
      files.splice(index, 1);
      logMessage(`${file} was removed`);
      return;
    }

    files.push(file);
    logMessage(`${file} was added`);
    return;
  }

  logMessage(`${file} was changed`);

});
