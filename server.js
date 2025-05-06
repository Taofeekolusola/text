const express = require('express')
const app = express()
const PORT = 4000

app.use(express.json())

let fruits = [
    { id: 1, name: 'Apple' },
    {id: 2, name: 'Orange'}
]

// Get all
app.get('api/fruits', (req, res) => {
    res.json(fruits)
})

//Get by id
app.get('api/fruits/:id', (req, res) => {
    const fruit = fruits.find(f => f.id === parseInt(req.params.id))
    if (!fruit) {
        return res.status(404).send('fruit not found')
    } else {
        res.json(fruit)
    }
})

// Post 
app.post('api/fruits', (req, res) => {
    const newFruit = {
        id: fruits.length + 1,
        name: req.body.name
    }

    fruits.push(newFruit)
    res.status(201).json(fruits)
})

//Update 
app.put('api/fruits/:id', (req, res) => {
    const fruit = fruits.find(f => f.id === parseInt(req.params.id))
    if (!fruit) return res.status(404).send('fruit not found')
    fruit.name = req.body.name
    res.json(fruit)
})

//Delete
app.delete('api/fruits/:id', (req, res) => {
    const fruits = fruits.filter(f => f.id !== parseInt(req.params.id))
    res.status(204).send();
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });