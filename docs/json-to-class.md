# Generate class from json

## Json file

For generate java classes, you can use Json file with attributes in tree nodes.

### Example json file

See [here](../example/example_to_class.json).

### How to

```js
const { JsonToJava } = require('json-2-java');
const fs = require('fs');

const readJsonFileContent = path => {
  return JSON.parse(fs.readFileSync(path).toString());
};

const java_class_result = JsonToJava.processJavaClass(
  readJsonFileContent('my_json.json')
);

fs.writeFileSync('MyClass.java', java_class_result);
```
