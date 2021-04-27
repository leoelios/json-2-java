const fs = require('fs');
const path = require('path');

function ensureDirectoryExistence(filePath) {
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const getFileContent = file_path => {
  return fs.readFileSync(file_path).toString();
};

const getFileJson = file_path => {
  return JSON.parse(getFileContent(file_path));
};

const writeFile = ({ file_path, content }) => {
  ensureDirectoryExistence(file_path);
  fs.writeFileSync(file_path, content);
};

module.exports = {
  getFileJson,
  getFileContent,
  writeFile,
};
