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
  "class_annotations": [
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
  "childs": [
    {
      "type": "method",
      "name": "myMethod",
      "encapsulation": "public",
      "returnType": "br.com.type.String"
    }
  ]
}
```

### Properties
