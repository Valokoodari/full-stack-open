curl -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer NootNoot' \
     -d '{ "author": "Olaf", "url": "https://www.olaf.blog/2013/why-i-love-summer.html", "title": "Why I love summer?", "year": 2014 }' \
     -X POST http://127.0.0.1:3001/api/blogs

curl -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer NootNoot' \
     -d '{ "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", "title": "TDD harms architecture", "year": 2017 }' \
     -X POST http://127.0.0.1:3001/api/blogs

curl -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer NootNoot' \
     -d '{ "author": "Michael Chan", "url": "https://reactpatterns.com/", "title": "React patterns", "year": 2023 }' \
     -X POST http://127.0.0.1:3001/api/blogs

curl -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer NootNoot' \
     -d '{ "author": "Robert C. Martin", "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html", "title": "First class tests", "year": 2017 }' \
     -X POST http://127.0.0.1:3001/api/blogs

curl -H 'Content-Type: application/json' \
     -H 'Authorization: Bearer NootNoot' \
     -d '{ "author": "Robert C. Martin", "url": "Type wars", "title": "Type wars", "year": 2016 }' \
     -X POST http://127.0.0.1:3001/api/blogs
