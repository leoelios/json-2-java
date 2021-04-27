const fs = require('fs');
const contentReplacer = require('./core/global/contentReplacer');
const {
  processConstructors,
  processAttribute,
  processAttributes,
  processRelationships,
  processMethod,
  processMethods,
  imports,
} = require('./core/util/class-generator');
const exampleJson = require('../example/example_to_class.json');

const testContentReplacer = () => {
  const file = fs.readFileSync('./test/archives/ArquivoTeste').toString();

  console.log(
    contentReplacer(file, {
      imports: 'TESTING REPLACER',
    })
  );
};

const testConstructorBuilder = () => {
  const lines = processConstructors(exampleJson);
  console.log(lines, imports);
};

const testProcessAttribute = () => {
  const { accessors, attribute } = processAttribute(exampleJson.attributes[0]);
  console.log(attribute);
  console.log(accessors);
  console.log(imports);
};

const testProcessAttributes = () => {
  const { gettersAndSetters, attributes } = processAttributes(exampleJson);

  console.log(attributes);
  console.log(gettersAndSetters);
};

const testProcessRelationships = () => {
  const { extends_classes, interfaces } = processRelationships(exampleJson);

  console.log(extends_classes, interfaces);
  console.log(imports);
};

const testProcessMethod = () => {
  console.log(
    processMethod({ ...exampleJson.methods[0], package: exampleJson.package })
  );

  console.log(imports);
};

const testProcessMethods = () => {
  console.log(processMethods(exampleJson));
  console.log(imports);
};

// testContentReplacer();
// testConstructorBuilder();
// testProcessAttribute();
// testProcessAttributes();
// testProcessRelationships();
// testProcessMethod();
// testProcessMethods();
