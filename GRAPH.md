```
graph_classes_1
@startuml
skinparam shadowing false


class Group {
  +UID : string
  +name : string
}

class User {
  +UID : string
  +name : string
}

class Project {
  +UID : string
  +name : string
}

class Specification {
  +UID : string
  +name : string
  +docName : string
  +reqRoot : string
  +type : eTypeSpec
  +version : string
}
note top of Specification 
  name: like "Technical Specifications 
            of XXX Subsystem"
  docName : like "TS_024_"
  reqRoot : root of the document's requirements. 
            Like "TS024_"
  version : like "1.1.2" "3.2.1_RC1"
end note

class Requirement {
  +UID : string 
  +reqID : integer
  +parentUID : integer list
  +version : string
  +reqStatus : eReqStatus
  +testStatus : eTestStatus
  +content : string
}

note top of Requirement 
  reqID : Like "201". Added to Specification.reqRoot 
            to create the req ID : "TS_024_201"
  parentUID : every REQ, in every Specification which 
            are parent of this REQ
  version : ???
  content : markdown text or html. depends of the 
            choosen directive
end note


enum eTypeSpec{
  REFERENCE
  PROJECT
}

enum eReqStatus{
  DRAFT
  READY
}

enum eTestStatus{
  NO_TEST
  NOT_TESTED
  TEST_FAILED
  TEST_SUCCESSED
}

@enduml
graph_classes
```


```
graph_relationship_1
@startuml
skinparam shadowing false


class Group {
}

class User {
}

class Project {
}

class Specification {
}

class Requirement {
}

enum typeDoc{
  REFERENCE
  PROJECT
}

class ReferenceSpecification {
  #type : REFERENCE
}

class ProjectSpecification{
  #type : PROJECT
}

Project "1" -- "1..N" ReferenceSpecification 
ReferenceSpecification "1..N" -- "1..N" ProjectSpecification
Specification "1" -- "0..N" Requirement
User "1" -- "0..N" Project
Group "1..N" -- "0..N" User

Specification <|-- ReferenceSpecification 
Specification <|-- ProjectSpecification
@enduml
graph_relationship
```
