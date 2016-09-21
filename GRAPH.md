```
http://plantuml.com/plantuml/png/bLF1Rjim3BtxAmXVTcXXrEbEkGH3wWuhYgvr6Y2tG9MPM8ijUPASDYZwxoCTExQt7HfV957lyP6FijifNGahId2voCohqblOYC9X40Io4Cx1Tslg2ju3W8lbZnkOWlEMK7pMeiG-yD4nbWxjMOH7QtwXz6TnReoiIzIV8b4WC_BXxvZ5twanVXJpXuf1l902H_PedJ9wM88s7i6R2ipcL0T1MNGAXTeXXCyeSwsaA61HeLGRsdhAue1m_KVyrMe5Y_h57Pp7CgJRlj8sqs9zDVcwvgk-OCiBiNsEJ6Wg-E8OK2kBV7BHMEg-JTRbwjiwoiHH74r22A-ZIHIlqtaS1gWpu5OxozFawL-teNMo2IdjSOkMG_Ieg8hbC4nApl_NKef9Go3jHvCU-ipYHmkQbCTs9bTn6C6tBCECSATPH9rH8mS882qAJack4GIQJ9t1d8lmmxgH2ZsmyYMrq9vEx-urLp8VAn2rvHzdenhFHcRFPZCwzysMmkxejzFWyOrO5d9V5X5aM97xhXlnI4NcnZZKaD6afLTx70oAjdNPlLwULPhS9cdoC4ze_vZ-l4lcpy777m00
graph_classes
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

class Document {
  +UID : string
  +name : string
  +docName : string
  +reqRoot : string
  +type : typeDoc
  +version : string
}
note top of Document
  name: like "Technical Specifications 
            of XXX Subsystem"
  docName : like "TS_024_"
  reqRoot : root of the document's requirements. 
            Like "TS024_"
  version : like "1.1.2" "3.2.1_RC1"
end note

class REQ {
  +UID : string 
  +reqID : integer
  +parentUID : integer list
  +version : string
  +content : string
}

note top of REQ 
  reqID : Like "201". Added to Document.reqRoot 
            to create the req ID : "TS_024_201"
  parentUID : every REQ, in every Document which 
            are parent of this REQ
  version : ???
  content : markdown text or html. depends of the 
            choosen directive
end note


enum typeDoc{
  REFERENCE
  PROJECT
}
@enduml
graph_classes
```


```
http://plantuml.com/plantuml/png/RL1B3e8m4DtFAIQurkZMkCDguaA5w06QEdwXa1PYZ7ftYuKmeAjstczUnjukEfT6fcZFyf3TB_g4HvbO0W2LI6jnQR8onoUy6s1loV1vQx8hgO93yqoLAUaE5el8ZwJB58j7Jaxr17J4GiHY7GhttyQRbGXtp4L7CgGLiKZ4GMN7ARFsspHohcRXJUTW4k1mw9xHQ1tyMGQ_KArjNRsDm9HUDlRX8eBlwRfmxGP_PXRkwSe1RUJivQW_DRk2NgCF
graph_relationship
@startuml
skinparam shadowing false


class Group {
}

class User {
}

class Project {
}

class Document {
}

class REQ {
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
User "1" -- "0..N" Project
Group "1..N" -- "0..N" User

Document <|-- ReferenceDocument 
Document <|-- ProjectDocument
@enduml
graph_relationship
```
