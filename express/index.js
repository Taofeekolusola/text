// queries.js
const db = require("./db");

exports.getAllUsers = async () => {
  const res = await db.query("SELECT * FROM users");
  return res.rows;
};

exports.getUserById = async (id) => {
  const res = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  return res.rows[0];
};

exports.createUser = async ({ name, email, age }) => {
  const res = await db.query(
    "INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *",
    [name, email, age]
  );
  return res.rows[0];
};

exports.updateUser = async (id, { name, email, age }) => {
  const res = await db.query(
    "UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *",
    [name, email, age, id]
  );
  return res.rows[0];
};

exports.deleteUser = async (id) => {
  await db.query("DELETE FROM users WHERE id = $1", [id]);
};
// db.js
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "123Adeshina12?",
  database: "postgres",
});

client.connect()
  .then(() => console.log("PostgreSQL connected"))
  .catch(err => console.error("Connection error", err.stack));


// index.js
const express = require("express");
const app = express();
const port = 3000;
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("./queries");

app.use(express.json());

// Get all users
app.get("/users", async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
});

// Get user by ID
app.get("/users/:id", async (req, res) => {
  const user = await getUserById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
});

// Create new user
app.post("/users", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json(user);
});

// Update user
app.put("/users/:id", async (req, res) => {
  const user = await updateUser(req.params.id, req.body);
  if (user) res.json(user);
  else res.status(404).json({ message: "User not found" });
});

// Delete user
app.delete("/users/:id", async (req, res) => {
  await deleteUser(req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = client;