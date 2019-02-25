const express = require('express');

const app = express();
const port = process.env.PORT || 7000;

app.get('/', (req, res) => {
    res.json({
        app: 'Welcome to Studemy',
        author: 'Offiah Chiazor',
        title: 'Web Developer'
    });
});


app.listen(port, (err) => {
    if (!err) {
        console.log(`Server running at http://localhost:${port}`)
    }
})