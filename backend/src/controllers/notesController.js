const Note = require("../models/Note");
const model = require("../utils/gemini");
const { v4: uuidv4 } = require("uuid");

exports.createNote = async (req, res) => {
  try {

    const note = await Note.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(note);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getNotes = async (req, res) => {
  try {

    const notes = await Note.find({
      user: req.user.id,
    }).sort({ updatedAt: -1 });

    res.json(notes);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.updateNote = async (req, res) => {
  try {

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedNote);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      message: "Note deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.archiveNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    note.archived = !note.archived;

    await note.save();

    res.json(note);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.generateSummary = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const prompt = `
    Summarize this note in short:

    ${note.content}
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    note.aiSummary = response;

    await note.save();

    res.json({
      summary: response,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.shareNote = async (req, res) => {
  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.isPublic = true;

    note.shareId = uuidv4();

    await note.save();

    res.json({
      message: "Share link generated",
      shareLink: `http://localhost:5000/notes/shared/${note.shareId}`,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getSharedNote = async (req, res) => {
  try {

    const note = await Note.findOne({
      shareId: req.params.shareId,
      isPublic: true,
    });

    if (!note) {
      return res.status(404).json({
        message: "Shared note not found",
      });
    }

    res.json(note);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};