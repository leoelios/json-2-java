const path = require('path');
const contentReplacer = require('../global/contentReplacer');
const { processJavaClass } = require('../util/class-generator');
const {
  getFileJson,
  getFileContent,
  writeFile,
} = require('../util/file-manipulator');

const action = (json_filepath, java_output_filepath) => {
  try {
    const nonBlankFields = [json_filepath, java_output_filepath];

    if (
      nonBlankFields.some(
        field => field == null || field == undefined || field.length === 0
      )
    ) {
      throw new Error('Some of args is blank, please, pass this.');
    }

    const file_json = getFileJson(json_filepath);
    const generated_java = processJavaClass(file_json);

    const template = getFileContent(
      path.resolve(__dirname, '../../template/ClassTemplate')
    );

    writeFile({
      file_path: `${java_output_filepath}/${file_json.name}.java`,
      content: contentReplacer(template, generated_java),
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  command: 'json_to_java_class [json_file] [java_output_file]',
  description: 'Create .java class from JSON file',
  action,
};
