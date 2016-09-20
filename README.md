![Alt text](http://g.gravizo.com/source/custom_mark?https%3A%2F%2Fraw.githubusercontent.com%2Fseeb0h%2FREQS.io%2Fmaster%2FREADME.md)<!---
custom_mark
@startuml
class Project {
  name
  docName
}

Project "1..N" - "1..N" ReferenceDocument 
ReferenceDocument "1" - "1..N" ProjectDocument
Document "1" - "0..*" REQ

Document <|-- ReferenceDocument 
Document <|-- ProjectDocument  

class Document {
  name
  docName
  reqToken
  REQ[]
}

class REQ {
  ID
  coveredIDs
  content
}

class ReferenceDocument {
}

class ProjectDocument {
}
@enduml
custom_mark
-->
