const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let items = [
    { id: 1, name: 'item One', description: 'desc for item one' },
    { id: 2, name: 'item Two', description: 'desc for item two' }
];

// Home route
app.get('/', (req, res) => {
    res.json('Hello, World');
});

// Get all
app.get('/items', (req, res) => {
    res.json(items);
});

// Get by id
app.get('/items/:id', (req, res) => {
    const item = items.find(f => f.id === parseInt(req.params.id));
    if (!item) {
        return res.status(404).send('item not found');
    }
    res.json(item);
});

// Post
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description || ''
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Update
app.put('/items/:id', (req, res) => {
    const item = items.find(f => f.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('item not found');
    item.name = req.body.name;
    item.description = req.body.description || item.description;
    res.json(item);
});

// Delete
app.delete('/items/:id', (req, res) => {
    const index = items.findIndex(f => f.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('item not found');
    items.splice(index, 1);
    res.status(204).send();
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});