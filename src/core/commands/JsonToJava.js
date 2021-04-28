const path = require('path');
const contentReplacer = require('../global/contentReplacer');
const {
  processConstructors,
  processImports,
  processAttributes,
  processAnnotations,
  processRelationships,
  processMethods,
  processToString,
  processEqualsHashCode,
} = require('../util/class-generator');
const {
  getFileJson,
  getFileContent,
  writeFile,
} = require('../util/file-manipulator');

const action = (json_filepath, java_output_filepath) => {
  /**
   * Receive json schema and generate java class equivalent.
   * @param {*} param0
   */
  const processJavaClass = json_schema => {
    const {
      author,
      annotations_class,
      package,
      encapsulation_class,
      name,
    } = json_schema;
    const { attributes, gettersAndSetters } = processAttributes(json_schema);
    const { extends_classes, interfaces } = processRelationships(json_schema);

    return {
      constructors: processConstructors(json_schema),
      attributes,
      internal_methods: [
        processToString(json_schema),
        processEqualsHashCode(json_schema),
        gettersAndSetters,
      ].join('\n\n'),
      author,
      annotations_class: processAnnotations({
        annotations: annotations_class,
        package,
      }),
      package,
      encapsulation_class,
      extends_classes,
      interfaces,
      name,
      methods: processMethods(json_schema),
      imports: processImports(),
    };
  };

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
