// Dependencies
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');


//Middleware that sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//HTML routes
//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
//API routes
//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});



//Listener
app.listen(PORT, () => {
    console.log(`App is Listening to PORT ${PORT}`);
});