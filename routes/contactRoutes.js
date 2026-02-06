const express = require("express");
const router = express.Router();
const validator = require("validator");

const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  try {
    let { name, email, message } = req.body;

    name = name?.trim();
    email = email?.trim();
    message = message?.trim();

    if (
      !name ||
      !message ||
      !email ||
      !validator.isEmail(email)
    ) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    try {
      await sendEmail({ name, email, message });
    } catch (emailError) {
      console.error("Email failed:", emailError.message);
    }

    res.status(201).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
