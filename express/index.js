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
