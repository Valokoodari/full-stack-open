curl -H 'Content-Type: application/json' \
     -d '{ "username": "olaf@snow.man", "name": "Olaf", "password": "Made4Summer" }' \
     -X POST http://127.0.0.1:3001/api/users

curl -H 'Content-Type: application/json' \
     -d '{ "username": "elsa@queen.snow", "name": "Elsa", "password": "LetItGo" }' \
     -X POST http://127.0.0.1:3001/api/users
