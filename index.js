const http = require('http');
const express = require('express');
const PORT = 3000;

const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
    console.log("Request received");
    res.send(`Hello Express!!!`)
})

app.get('/albums', (req, res) => {
    res.send(`a list of albums`);
})

// :albumID is a placeholder
// can't match the following:
// ? & = % /
app.get(`/albums/:albumID`, (req, res) => {
    
    res.send(`You want: ${req.params.albumID}`)
})

app.get(`/albums/:albumID/songs`, (req, res) => {
    res.send(`The songs for album ${req.params.albumID}`)
})

app.get(`/albums/:albumID/songs/:songID`, (req, res) => {
    res.send(`Song ${req.params.songID} on album ${req.params.albumID}`)
})

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})
