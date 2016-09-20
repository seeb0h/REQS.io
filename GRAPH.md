custom_mark
@startuml
class Project1 {
  name
  docName
}

Document <|-- ReferenceDocument 
Document <|-- ProjectDocument  

Project1 "1..N" - "1..N" ReferenceDocument 
ReferenceDocument "1" - "1..N" ProjectDocument
Document "1" - "0..N" REQ

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
