# Part 0 - Fundamentals of Web apps

## Exercises
- [x] 0.1 HTML  
- [x] 0.2 CSS  
- [x] 0.3 HTML forms
- [x] 0.4 [New note diagram](#exercise-04)
- [x] 0.5 [Single page app diagram](#exercise-05)
- [x] 0.6 [New note in Single page app diagram](#exercise-06)


### Exercise 0.4
```mermaid
sequenceDiagram
    title Creating a new note

    Browser -> Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note over Server: Add the new note to the 'notes' array
    Server --> Browser: HTTP 302 /exampleapp/notes

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    Server --> Browser: HTTP 200 HTML code

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server --> Browser: HTTP 304

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Server --> Browser: HTTP 304

    note over Browser: Execute main.js which will request the data.json file

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server --> Browser: HTTP 200 JSON data

    note over Browser: The event handler in main.js renders the notes in data.json
```


### Exercise 0.5
```mermaid
sequenceDiagram
    title Loading the SPA version

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    Server --> Browser: HTTP 200 HTML code

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Server --> Browser: HTTP 200 main.css

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Server -> Browser: HTTP 200 spa.js

    note over Browser: Execute spa.js which will request the data.json file

    Browser -> Server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Server --> Browser: HTTP 200 JSON data

    note over Browser: spa.js renders the notes in data.json
```


### Exercise 0.6
```mermaid
sequenceDiagram
    title Creating a new note on the SPA version

    note over Browser: Execute the event handler in spa.js:<br/>- Read the note from the form and create a JSON object<br/>- Add the JSON object to the local notes array<br/>- Clear the form<br/>- Rerender the notes with the new note added

    Browser -> Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    note over Server: Add the new note to the 'notes' array
    Server --> Browser: HTTP 201

    note over Browser: Log the server response text to the console.
```
