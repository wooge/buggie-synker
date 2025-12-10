import express from "express";
import {
  createUser,
  deleteUser,
  getUserByUsername,
  getUsers,
} from "../storage/user-storage.js";

const router = express.Router();

router.get("/", (_, res) => {
  try {
    const users = getUsers();

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.get("/:username", (req, res) => {
  try {
    const user = getUserByUsername(req.params.username);
    if (!user) return res.status(404).end();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.post("/", (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username and password are required." });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "password must be at least 8 characters long" });
    }

    const existingUser = getUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists." });
    }

    const newUser = createUser({
      username,
      password,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

router.delete("/:username", (req, res) => {
  try {
    const username = req.params.username;

    if (!getUserByUsername(username)) {
      return res.status(404).end();
    }

    const result = deleteUser(username);

    if (!result) {
      return res.status(403).json({ error: "User could not be deleted." });
    }

    res.status(204).end();
  } catch (err) {
    console.error(err.message);
    res.status(500).end();
  }
});

export default router;
