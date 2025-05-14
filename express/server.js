const express = require("express");
const { Client } = require("pg");

const app = express();
const port = 3000;

// PostgreSQL Client Setup
const db = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "123Adeshina12?",
  database: "postgres",
});

db.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("Connection error", err.stack));

// Middleware
app.use(express.json());

// Routes

// GET all users
app.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET user by ID
app.get("/users/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [req.params.id]);
    const user = result.rows[0];
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new user
app.post("/users", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
      [name, email, age]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user
app.put("/users/:id", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = await db.query(
      "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
      [name, email, age, req.params.id]
    );
    const user = result.rows[0];
    if (user) res.json(user);
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user
app.delete("/users/:id", async (req, res) => {
  try {
    await db.query("DELETE FROM users WHERE id = $1", [req.params.id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});