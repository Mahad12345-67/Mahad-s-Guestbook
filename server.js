const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let comments = [];


const loadComments = () => {
    if (fs.existsSync('comments.json')) {
        const data = fs.readFileSync('comments.json');
        comments = JSON.parse(data);
    }
};


const saveComments = () => {
    fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
};

loadComments();


app.get('/comments', (req, res) => {
    res.json(comments);
});


app.post('/comments', (req, res) => {
    const newComment = req.body;
    comments.push(newComment);
    saveComments();
    res.status(201).json(newComment);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
