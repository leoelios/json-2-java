const _imports = new Set();
const SPACE = '    ';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * Extract full package of a artifact.
 * @param {*} artifact
 * @returns
 */
const extractPackage = artifact => {
  return artifact.substring(0, artifact.lastIndexOf('.'));
};

/**
 * Extract type of full package and type string.
 * @param {*} artifact
 * @returns
 */
const extractType = artifact => {
  return artifact.substring(artifact.lastIndexOf('.') + 1);
};

/**
 * Add new import for java class generated.
 * @param {*} artifact
 */
const addImport = ({ artifact, classPackage }) => {
  if (classPackage != extractPackage(artifact)) {
    _imports.add(artifact);
  }
};

const processAssigmentsAttributes = attributes => {
  const lines = [];

  attributes.forEach(attr => {
    lines.push(`${SPACE}${SPACE}this.${attr.name} = ${attr.name};`);
  });

  return lines;
};

/**
 * Using a parameter, generate constructors.
 * @param {*} param0
 */
const processConstructors = ({
  name,
  attributes,
  allArgsConstructor,
  constructorNoArgs,
  defaultConstructor,
  package,
}) => {
  const lines = [];

  if (!name) {
    throw new Error(
      'The name of class should be passed to process constructors.'
    );
  }

  if (constructorNoArgs) {
    lines.push(`${SPACE}public ${name}() {`);
    lines.push(`${SPACE}${SPACE}${defaultConstructor.content}`);
    lines.push(`${SPACE}}`);
    lines.push(SPACE);
  }

  if (allArgsConstructor) {
    attributes.forEach(attr =>
      addImport({ artifact: attr.type, classPackage: package })
    );
    lines.push(
      `${SPACE}public ${name}(${attributes
        .map(at => `${extractType(at.type)} ${at.name}`)
        .join(', ')}) {`
    );
    lines.push(...processAssigmentsAttributes(attributes));
    lines.push(`${SPACE}}`);
  }

  return lines.join('\n');
};

/**
 * Generate getters and setters from attribute.
 * @param {*} param0
 * @returns
 */
const processGetterSetter = ({ name, type, getters, setters }) => {
  const lines = [];

  if (getters) {
    lines.push(
      `${SPACE}public ${extractType(type)} get${name.capitalize()}() {`
    );
    lines.push(`${SPACE}${SPACE}return this.${name};`);
    lines.push(`${SPACE}}`);
  }

  lines.push(SPACE);

  if (setters) {
    lines.push(
      `${SPACE}public void set${name.capitalize()}(${extractType(
        type
      )} ${name}) {`
    );
    lines.push(`${SPACE}${SPACE}this.${name} = ${name};`);
    lines.push(`${SPACE}}`);
  }

  lines.push(SPACE);

  return lines.join('\n');
};

/**
 * Process the annotation json schema and generate java code equivalent.
 * @param {*} annotations
 */
const processAnnotation = ({ name, parameters, package }) => {
  addImport({ artifact: name, classPackage: package });
  return `@${extractType(name)}(${parameters
    ?.map(p => `${p.name} = ${p.value}`)
    .join(', ')})`;
};

/**
 * Process a set of a annotation and return concat all.
 * @param {*} param0
 * @returns
 */
const processAnnotations = ({ annotations, package }) => {
  return annotations
    .map(an => processAnnotation({ ...an, package }))
    .join('\n');
};

/**
 * Receive JSON schema attribute, generate code Java equivalent,
 * whether or not generate access methods (getters and setters)
 * @param {*} schema
 */
const processAttribute = ({
  name,
  encapsulation,
  type,
  getters,
  setters,
  annotations,
  package,
}) => {
  const lines = [];
  addImport({ artifact: type, classPackage: package });

  annotations.forEach(annotation =>
    lines.push(`${SPACE}${processAnnotation({ ...annotation, package })}`)
  );
  lines.push(`${SPACE}${encapsulation} ${extractType(type)} ${name};`);

  lines.push(SPACE);

  return {
    attribute: lines.join('\n'),
    accessors: processGetterSetter({ name, type, getters, setters }),
  };
};

/**
 * Process attributes from complete schema json.
 * @param {*} param0
 * @returns
 */
const processAttributes = ({ attributes, package }) => {
  const generated = attributes.map(at => processAttribute({ ...at, package }));

  const gettersAndSetters = generated
    .map(attributeGenerated => attributeGenerated.accessors)
    .join('\n');

  const generatedAttributes = generated
    .map(attributeGenerated => attributeGenerated.attribute)
    .join('\n');

  return {
    gettersAndSetters,
    attributes: generatedAttributes,
  };
};

/**
 * Processa os imports atual e retorna em formato final para JAVA.
 * @returns
 */
const processImports = () => {
  return [..._imports].map(imp => `import ${imp};`).join('\n');
};

/**
 * Process relationship of a class and return string JAVA code.
 * @param {*} param0
 * @returns
 */
const processRelationships = ({ extends_classes, interfaces, package }) => {
  [...extends_classes, ...interfaces].forEach(element =>
    addImport({
      artifact: element,
      classPackage: package,
    })
  );

  return {
    interfaces: interfaces.map(clasz => extractType(clasz)).join(', '),
    extends_classes: extends_classes
      .map(inter => extractType(inter))
      .join(', '),
  };
};

const processMethod = ({
  encapsulation,
  returnType,
  name,
  content,
  parameters,
  annotations,
  package,
  throws,
}) => {
  const lines = [];

  parameters.forEach(p =>
    addImport({
      artifact: p.type,
      classPackage: package,
    })
  );

  addImport({
    artifact: returnType,
    classPackage: package,
  });

  const formated_parameters = parameters
    .map(p => `${extractType(p.type)} ${p.name}`)
    .join(', ');

  lines.push(
    `${SPACE}${encapsulation} ${extractType(
      returnType
    )} ${name}(${formated_parameters}) ${
      (throws && `throws ${throws}`) || ''
    } {`
  );

  lines.push(`${SPACE}${SPACE}${content}`);
  lines.push(`${SPACE}}`);

  return SPACE.concat(processAnnotations({ annotations, package }))
    .concat('\n')
    .concat(lines.join('\n'));
};

const processMethods = ({ methods, package }) => {
  return methods
    .map(method => processMethod({ ...method, package }))
    .join('\n\n');
};

module.exports = {
  processConstructors,
  processAttribute,
  processImports,
  processAttributes,
  processAnnotations,
  processRelationships,
  processMethod,
  processMethods,
  imports: _imports,
};
