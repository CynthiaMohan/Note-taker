// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');

//Middleware that sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

let id = 0;

//highest id
function checkHighestId(notesArray) {
    let highestId = 0;
    for (let i = 0; i < notesArray.length; i++) {
        if (notesArray[i].id > highestId) {
            highestId = notesArray[i].id;
        }
        else {
            highestId = notesArray.length;
        }

    }
}
//Validating format of the users notes
function validateNote(notes) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
        return false;
    }
    return true;
}

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return (notesArray);
}

//API routes
//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    let result = notes;
    res.json(result);
});

//HTML routes
//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// //POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client
app.post('/api/notes', (req, res) => {
    let nextId = checkHighestId(notes);

    req.body.id = nextId.toString();
    console.log(req.body)
    if (!validateNote(req.body)) {
        res.status(400).send('Incorrect Note Format.');
    }
    else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});
app.delete('/api/notes/:id', (req, res) => {
    res.send(`Request to delete req param ${req.params.id} confirmed`);
    notes.splice(req.params.id, 1);
    console.log(notes);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes }), err => {
            if (err) {
                throw err;
            }
            else
                return true;
        });
});


//Listener
app.listen(PORT, () => {
    console.log(`App is Listening to PORT ${PORT}`);
});