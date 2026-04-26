const db = require("../config/db");

const getAllUsers = (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching users" });
    }
    res.json(results);
  });
};

const blockUser = (req, res) => {
  const userId = req.params.id;

  db.query(
    "UPDATE users SET is_blocked = 1 WHERE id = ?",
    [userId],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error blocking user" });
      }

      res.json({ message: "User blocked successfully" });
    }
  );
};

module.exports = {
  getAllUsers,
  blockUser,
};