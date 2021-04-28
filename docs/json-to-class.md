# Generate class from json

## Json file

For generate java classes, you can use Json file with attributes in tree nodes.

### Example json file

```json
{
  "package": "br.com.example",
  "name": "MyClass",
  "encapsulation_class": "public",
  "author": "Pizzaia Teste Elias de Oliveira",
  "annotations_class": [
    {
      "name": "br.com.annotations.MyAnotation",
      "parameters": [
        {
          "name": "admin",
          "value": "true"
        }
      ]
    },
    {
      "name": "br.com.annotations.Pizzaia",
      "parameters": [
        {
          "name": "programador",
          "value": "true"
        }
      ]
    }
  ],
  "extends_classes": ["br.com.test.JuNIT"],
  "interfaces": ["br.com.interfaces.IMy"],
  "methods": [
    {
      "name": "myMethod",
      "encapsulation": "public",
      "returnType": "br.com.type.String",
      "throws": "ValidacaoException",
      "annotations": [
        {
          "name": "br.com.annotations.MyAnotation",
          "parameters": []
        }
      ],
      "parameters": [
        {
          "type": "br.com.type.Test",
          "name": "test"
        }
      ],
      "content": "// conteudo do método"
    },
    {
      "name": "myMethod",
      "encapsulation": "public",
      "returnType": "br.com.type.String",
      "annotations": [
        {
          "name": "br.com.annotations.MyAnotation",
          "parameters": []
        }
      ],
      "parameters": [
        {
          "type": "br.com.type.Test",
          "name": "test"
        }
      ],
      "content": "// other content"
    }
  ],
  "attributes": [
    {
      "name": "myOwnAttribute",
      "encapsulation": "private",
      "type": "br.com.type.String",
      "getters": true,
      "setters": true,
      "annotations": [
        {
          "name": "br.com.annotations.MyAnotation",
          "parameters": [
            {
              "name": "admin",
              "value": "true"
            }
          ]
        }
      ]
    },
    {
      "name": "otherAttribute",
      "encapsulation": "private",
      "type": "br.com.type.Macaco",
      "getters": true,
      "setters": true,
      "annotations": [
        {
          "name": "br.com.annotations.MyAnotation2",
          "parameters": [
            {
              "name": "admin",
              "value": "true"
            }
          ]
        }
      ],
      "parameters": [
        {
          "type": "br.com.type.Test",
          "name": "test"
        }
      ]
    }
  ],
  "allArgsConstructor": true,
  "constructorNoArgs": true,
  "defaultConstructor": {
    "content": "inicializar();"
  },
  "generateEqualsHashCode": true,
  "generateToString": true
}
```

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
