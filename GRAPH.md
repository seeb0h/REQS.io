<!---
custom_mark
@startuml
class Project {
  name
  docName
}

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
