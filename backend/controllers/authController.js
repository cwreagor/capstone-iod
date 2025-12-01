const User = require("../models/User");
const jwt = require("jsonwebtoken");

function createToken(email) {
  return jwt.sign({ email }, "secret123", { expiresIn: "7d" });
}

async function signupUser(req, res) {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already registered." });
    }

    const user = await User.create({ email, password });

    const token = createToken(email);

    res.status(200).json({ email, token });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found." });
    }

    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password." });
    }

    const token = createToken(email);

    res.status(200).json({ email, token });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { signupUser, loginUser };