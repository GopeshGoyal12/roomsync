const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const aiService = require("../services/aiService");


// ================= CREATE ROOM =================
exports.createRoom = async (req, res) => {

  const {
    title,
    room_type,
    property_type, // from new UI
    contact_details,
    contact_email, // from new UI
    phone_number,  // from new UI
    location,
    address,       // from new UI
    rent,
    vacancies,
    gender_preference,
    food_preference,
    occupation_preference,
    description
  } = req.body;

  // Map new UI fields to DB schema fields
  const finalLocation = location || address || "Not specified";
  require("fs").appendFileSync("debug.log", "\n--- DEBUG REQUEST ---\nfinalLocation is: " + finalLocation + "\nReq body: " + JSON.stringify(req.body) + "\n");
  const finalRoomType = room_type || property_type || "Shared";
  const finalContact = contact_details || [contact_email, phone_number].filter(Boolean).join(" | ") || "";
  const finalVacancies = vacancies || 1;
  const finalRent = parseInt(rent) || 0;

  // convert checkbox values from string to number
  const drinking_allowed = req.body.drinking_allowed === "true" ? 1 : 0;
  const smoking_allowed = req.body.smoking_allowed === "true" ? 1 : 0;

  const user_id = req.user.id;

  const image = req.file ? req.file.filename : null;

  // AI Fake Listing Detection
  let isSuspicious = false;
  let suspiciousReason = null;
  try {
    const analysis = await aiService.analyzeListing({
      title,
      rent,
      description,
      image
    });
    isSuspicious = analysis.isSuspicious ? 1 : 0;
    suspiciousReason = analysis.reason;
  } catch (err) {
    console.log("AI Analysis failed silently:", err);
  }

  const sql = `
    INSERT INTO rooms
    (user_id,title,room_type,contact_details,location,rent,vacancies,gender_preference,food_preference,drinking_allowed,smoking_allowed,occupation_preference,description,image,is_suspicious,suspicious_reason)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      user_id,
      title || "Room Available",
      finalRoomType,
      finalContact,
      finalLocation,
      finalRent,
      finalVacancies,
      gender_preference || "Any",
      food_preference || "Any",
      drinking_allowed || 0,
      smoking_allowed || 0,
      occupation_preference || "Any",
      description || "",
      image,
      isSuspicious,
      suspiciousReason
    ],
    (err) => {

      if (err) {
        console.log("CREATE ROOM ERROR:", err);
        require("fs").appendFileSync("debug.log", new Date().toISOString() + " - " + err.message + "\n");
        return res.status(500).json({
          message: err.sqlMessage || err.message
        });
      }

      res.json({
        message: "Room posted successfully",
        image: image ? `/uploads/${image}` : null,
        isSuspicious: !!isSuspicious,
        suspiciousReason
      });

    }
  );

};



// ================= GET ALL ROOMS =================
exports.getAllRooms = (req, res) => {

  let sql = "SELECT * FROM rooms WHERE 1=1";
  let countSql = "SELECT COUNT(*) AS total FROM rooms WHERE 1=1";
  let values = [];

  const {
    room_type,
    location,
    maxRent,
    gender,
    food,
    drinking,
    smoking,
    occupation,
    page = 1,
    limit = 5
  } = req.query;

  let conditions = "";

  if (room_type) {
    conditions += " AND room_type = ?";
    values.push(room_type);
  }

  if (location) {
    conditions += " AND location LIKE ?";
    values.push(`%${location}%`);
  }

  if (maxRent) {
    conditions += " AND rent <= ?";
    values.push(maxRent);
  }

  if (gender) {
    conditions += " AND gender_preference = ?";
    values.push(gender);
  }

  if (food) {
    conditions += " AND food_preference = ?";
    values.push(food);
  }

  if (drinking !== undefined) {
    conditions += " AND drinking_allowed = ?";
    values.push(drinking === "true" ? 1 : 0);
  }

  if (smoking !== undefined) {
    conditions += " AND smoking_allowed = ?";
    values.push(smoking === "true" ? 1 : 0);
  }

  if (occupation) {
    conditions += " AND occupation_preference LIKE ?";
    values.push(`%${occupation}%`);
  }

  sql += conditions;
  countSql += conditions;

  const offset = (page - 1) * limit;

  sql += " ORDER BY created_at DESC LIMIT ? OFFSET ?";
  let countValues = [...values];
  values.push(parseInt(limit), parseInt(offset));

  db.query(sql, values, (err, rooms) => {

    if (err) {
      return res.status(500).json({
        message: "Error fetching rooms"
      });
    }

    db.query(countSql, countValues, (err, countResult) => {

      if (err) {
        return res.status(500).json({
          message: "Error counting rooms"
        });
      }

      const totalRooms = countResult[0].total;

      res.json({
        rooms,
        totalRooms,
        page: parseInt(page),
        totalPages: Math.ceil(totalRooms / limit)
      });

    });

  });

};



// ================= GET MY ROOMS =================
exports.getMyRooms = (req, res) => {

  const userId = req.user.id;

  db.query(
    "SELECT * FROM rooms WHERE user_id=?",
    [userId],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          message: "Error fetching rooms"
        });
      }

      res.json(results);

    }
  );

};



// ================= UPDATE ROOM =================
exports.updateRoom = (req, res) => {

  const roomId = req.params.id;
  const userId = req.user.id;

  db.query(
    "SELECT * FROM rooms WHERE id=?",
    [roomId],
    (err, results) => {

      if (results.length === 0) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      const room = results[0];

      if (room.user_id !== userId && req.user.role !== "admin") {
        return res.status(403).json({
          message: "Not authorized"
        });
      }

      const image = req.file ? req.file.filename : room.image;

      if (req.file && room.image) {

        const imagePath = path.join(__dirname, "../uploads", room.image);

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Image delete error:", err.message);
          }
        });

      }

      const {
        title,
        room_type,
        contact_details,
        location,
        rent,
        vacancies,
        gender_preference,
        food_preference,
        occupation_preference,
        description
      } = req.body;

      const drinking_allowed = req.body.drinking_allowed === "true" ? 1 : 0;
      const smoking_allowed = req.body.smoking_allowed === "true" ? 1 : 0;

      db.query(
        `UPDATE rooms SET
        title=?,room_type=?,contact_details=?,location=?,rent=?,vacancies=?,gender_preference=?,food_preference=?,drinking_allowed=?,smoking_allowed=?,occupation_preference=?,description=?,image=?
        WHERE id=?`,
        [
          title || room.title,
          room_type || room.room_type,
          contact_details || room.contact_details,
          location,
          rent,
          vacancies,
          gender_preference,
          food_preference,
          drinking_allowed,
          smoking_allowed,
          occupation_preference,
          description,
          image,
          roomId
        ],
        (err) => {

          if (err) {
            return res.status(500).json({
              message: "Update error"
            });
          }

          res.json({
            message: "Room updated successfully"
          });

        }
      );

    }
  );

};



// ================= DELETE ROOM =================
exports.deleteRoom = (req, res) => {

  const roomId = req.params.id;
  const userId = req.user.id;

  db.query(
    "SELECT * FROM rooms WHERE id=?",
    [roomId],
    (err, results) => {

      if (results.length === 0) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      const room = results[0];

      if (room.user_id !== userId && req.user.role !== "admin") {
        return res.status(403).json({
          message: "Not authorized"
        });
      }

      if (room.image) {

        const imagePath = path.join(__dirname, "../uploads", room.image);

        fs.unlink(imagePath, (err) => {
          if (err) {
            console.log("Image delete error:", err.message);
          }
        });

      }

      db.query(
        "DELETE FROM rooms WHERE id=?",
        [roomId],
        (err) => {

          if (err) {
            return res.status(500).json({
              message: "Delete error"
            });
          }

          res.json({
            message: "Room deleted successfully"
          });

        }
      );

    }
  );

};



// ================= SAVE ROOM =================
exports.saveRoom = (req, res) => {

  const userId = req.user.id;
  const roomId = req.params.id;

  db.query(
    "INSERT INTO saved_rooms (user_id, room_id) VALUES (?, ?)",
    [userId, roomId],
    (err) => {

      if (err) {
        return res.status(400).json({
          message: "Room already saved"
        });
      }

      res.json({
        message: "Room saved successfully"
      });

    }
  );

};



// ================= GET SAVED ROOMS =================
exports.getSavedRooms = (req, res) => {

  const userId = req.user.id;

  const sql = `
    SELECT rooms.*
    FROM rooms
    JOIN saved_rooms
    ON rooms.id = saved_rooms.room_id
    WHERE saved_rooms.user_id = ?
    ORDER BY saved_rooms.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Error fetching saved rooms"
      });
    }

    res.json(results);

  });

};



// ================= UNSAVE ROOM =================
exports.unsaveRoom = (req, res) => {

  const userId = req.user.id;
  const roomId = req.params.id;

  db.query(
    "DELETE FROM saved_rooms WHERE user_id=? AND room_id=?",
    [userId, roomId],
    (err) => {

      if (err) {
        return res.status(500).json({
          message: "Error removing saved room"
        });
      }

      res.json({
        message: "Room removed from saved list"
      });

    }
  );

};



// ================= GET ROOM BY ID =================
exports.getRoomById = (req, res) => {

  const roomId = req.params.id;

  db.query(
    "SELECT * FROM rooms WHERE id=?",
    [roomId],
    (err, results) => {

      if (err) {
        return res.status(500).json({
          message: "Error fetching room"
        });
      }

      res.json(results[0]);

    }
  );

};

// ================= SEARCH ROOMS BY AI =================
exports.searchByAI = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const filters = await aiService.parseSearchQuery(query);
    
    let sql = "SELECT * FROM rooms WHERE 1=1";
    let values = [];

    if (filters.location) {
      sql += " AND location LIKE ?";
      values.push(`%${filters.location}%`);
    }

    if (filters.maxRent) {
      sql += " AND rent <= ?";
      values.push(filters.maxRent);
    }

    if (filters.amenities && filters.amenities.length > 0) {
      const amenitiesText = filters.amenities.join(" ").toLowerCase();
      if (amenitiesText.includes("drink")) {
        sql += " AND drinking_allowed = 1";
      }
      if (amenitiesText.includes("smok")) {
        sql += " AND smoking_allowed = 1";
      }
    }

    sql += " ORDER BY created_at DESC LIMIT 20";

    db.query(sql, values, (err, rooms) => {
      if (err) {
        return res.status(500).json({ message: "Database search error" });
      }
      res.json({
        rooms,
        filtersExtracted: filters
      });
    });

  } catch (err) {
    res.status(500).json({ message: "AI processing failed" });
  }
};