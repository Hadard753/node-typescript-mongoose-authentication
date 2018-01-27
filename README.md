# node-typescript-mongoose-authentication
basic functionality authentication API - using nodejs, express,  typescript and mongoose

# routes
## POST auth/register
  ###*Receive - 
    user object { "user": { "email": string, "password": string} }
  ###*Operate - 
    hash the password of the user, generate new token for the user and save the user to users collection in the following format: 
            { email: string;
              password: string;
              tokens: {access: string, token: string}[] }
  ###*Returns - 
    created user {_id: string, email: string} with x-auth header contains the generated token

  ###*Example: 
    ####-Receive: { 
                "user": { 
                  "email": "hadar7@gmil.com", 
                  "password": "1234" 
                } 
              }
    ####-Save to DB: {
                  "_id" : ObjectId("5a6b890ed4625609b8a6341a"),
                  "email" : "hadar7@gmail.com",
                  "password" : "sha1$3fea87b5$1$cae76e7aa1bd61ad3f1ef6c460d0c6452afe81d2",
                  "tokens" : [ 
                      {
                          "_id" : ObjectId("5a6b890ed4625609b8a6341b"),
                          "access" : "auth",
                          "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp............"
                      }
                  ],
                  "__v" : 2
                }
    ####-Return: {
              "_id": "5a6c4d558dd31b1a2c6770a9",
              "email": "hadar7@gmail.com"
            }
