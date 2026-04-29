graph TD
    Client[Хэрэглэгч/Postman] --> Express[Express API Server]
    Express --> Routes[Routes/Замууд]
    Routes --> Controllers[Controllers/Логик]
    Controllers --> Models[Models/Өгөгдлийн бүтэц]
    Models --> MongoDB[(MongoDB Database)]