// implement your API here
const express = require('express');
const server = express();
const User = require('./data/db');
const cors = require('cors');
const port = 5000;


server.use(express.json());
server.use(cors());

//Routes
server.get('/api/users', (req, res) => {
    User.find()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error);
        })
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id)
        .then(data => {
            if(data.length === 0) {
                res.status(404).json(`User with that ${id} not found`);
            }
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error);
        });
});

server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if (!name || !bio ) {
        res.status(404).json('Must provide Name and Bio')
    }
    User.insert({ name, bio })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.json(error);
        })
}
);

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (!name || !bio ) {
        res.status(404).json('Must provide Name and Bio')
    }
    User.update(id, {name, bio })
        .then(data => {
            if (data == 0) {
                res.status(404).json(`The user with id ${id} does not exist`);
            }
            res.status(200).json(`User ${id} updated`);
        })
        .catch(error => {
            res.json(error);
        })
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    User.remove(id)
        .then(data => {
            if (data === 0) {
                res.status(404).json(`The user with id ${id} does not exist`);
            }
            res.status(200).json(`User with id ${id} has been removed`);
        })
        .catch(error => {
            res.json(error);
        })

});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

