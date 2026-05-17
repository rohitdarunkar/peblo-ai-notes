const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  archiveNote,
  generateSummary,
  shareNote,
  getSharedNote,
} = require("../controllers/notesController");

router.post("/", authMiddleware, createNote);

router.get("/", authMiddleware, getNotes);

router.patch("/:id", authMiddleware, updateNote);

router.delete("/:id", authMiddleware, deleteNote);

router.patch(
  "/archive/:id",
  authMiddleware,
  archiveNote
);

router.post(
  "/summary/:id",
  authMiddleware,
  generateSummary
);

router.post(
  "/share/:id",
  authMiddleware,
  shareNote
);

router.get(
  "/shared/:shareId",
  getSharedNote
);

module.exports = router;