// Dependencies

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');


//Middleware that sets up the express app to handle data parsing

app.use(express.urlencoded({ extended: true }));

//HTML routes
//GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

//GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
//API routes
//GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(notes);
});



//Listener
app.listen(PORT, () => {
    console.log(`App is Listening to PORT ${PORT}`);
});