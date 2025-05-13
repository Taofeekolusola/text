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