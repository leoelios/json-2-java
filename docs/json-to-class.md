# Generate class from json

## Json file

For generate java classes, you can use Json file with attributes in tree nodes.

### Example

```json
{
  "package": "br.com.example",
  "name": "MyClass",
  "encapsulation_class": "public",
  "author": "Leonardo Elias de Oliveira",
  "annotations_class": [
    {
      "name": "br.com.annotations.MyAnotation",
      "attributes": [
        {
          "name": "admin",
          "value": "true"
        }
      ]
    }
  ],
  "extends_classes": ["br.com.methods.OtherClass"],
  "interfaces": ["br.com.interfaces.IMy"],
  "methods": [
    {
      "name": "myMethod",
      "encapsulation": "public",
      "returnType": "br.com.type.String",
      "annotations": [
        {
          "name": "br.com.annotations.MyAnotation",
          "attributes": [
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
          "attributes": [
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
  "constructorNoArgs": true
}
```

### Properties
