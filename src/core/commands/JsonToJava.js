const contentReplacer = require('../global/contentReplacer');
const {
  processConstructors,
  processImports,
  processAttributes,
  processAnnotations,
  processRelationships,
} = require('../util/class-generator');
const { getFileJson, getFileContent } = require('../util/file-manipulator');

const action = (json_filepath, java_output_filepath) => {
  const _imports = new Set();

  /**
   * Receive JSON schema method and return string code JAVA equivalent.
   * @param {*} schema
   */
  const processMethod = schema => {};

  /**
   * Process the extends classes, implemented interfaces
   * and generate string code equivalent.
   * @param {*} classes
   */
  const processUsageClasses = classes => {};

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
      internal_methods: gettersAndSetters,
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

    const generated_java = processJavaClass(getFileJson(json_filepath));
    const template = getFileContent('./src/template/ClassTemplate');

    console.log(contentReplacer(template, generated_java));
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  command: 'json_to_java_class [json_file] [java_output_file]',
  description: 'Create .java class from JSON file',
  action,
};
