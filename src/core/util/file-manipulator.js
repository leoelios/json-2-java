const fs = require('fs');

const getFileContent = file_path => {
  return fs.readFileSync(file_path).toString();
};

const getFileJson = file_path => {
  return JSON.parse(getFileContent(file_path));
};

const writeFile = ({ file_path, content }) => {
  fs.writeFileSync(file_path, content);
};

module.exports = {
  getFileJson,
  getFileContent,
  writeFile,
};
