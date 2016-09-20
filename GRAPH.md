```
custom_mark
@startuml
skinparam shadowing false


class Project {
  #name : string
  #docName : string
}

class Document {
  #name : string
  #docName : string
  #reqToken : string
  #type : typeDoc
}

class REQ {
  #ID : integer
  #parentID : integer list
  #content : string
}

enum typeDoc{
  REFERENCE
  PROJECT
}

class ReferenceDocument {
  #type : REFERENCE
}

class ProjectDocument{
  #type : PROJECT
}

Project "1" -- "1..N" ReferenceDocument 
ReferenceDocument "1..N" -- "1..N" ProjectDocument
Document "1" -- "0..N" REQ

Document <|-- ReferenceDocument 
Document <|-- ProjectDocument
@enduml
custom_mark

```
