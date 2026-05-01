# System Architecture

## Overview
Энэхүү систем нь MVC (Model-View-Controller) загварт суурилсан REST API бүтэцтэй байна.

## Diagram
```mermaid
graph LR
    User([User/Client]) <--> API[Express API Server]
    subgraph Backend
        API <--> Routes[Routes]
        Routes <--> Controllers[Controllers]
        Controllers <--> Models[Mongoose Models]
    end
    Models <--> DB[(MongoDB Atlas)]