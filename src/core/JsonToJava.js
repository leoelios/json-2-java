const fs = require('fs');

module.exports = {
  command: 'json_to_java_class [json_file] [java_output_file]',
  description: 'Create .java class from JSON file',
  action: (json_filename, java_output_file) => {
    const json_file = JSON.parse(fs.readFileSync(json_filename).toString());
    console.log(json_file);
  },
};
