import Contact from "../models/Contact.js";

// ===============================
// GET CONTACT DATA
// ===============================
export const getContact = async (req, res) => {
  try {
    let doc = await Contact.findOne();

    if (!doc) {
      doc = await Contact.create({});
    }

    res.json(doc);
  } catch (err) {
    console.error("❌ CONTACT GET ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// ===============================
// SAVE CONTACT DATA
// ===============================
export const saveContact = async (req, res) => {
  try {
    let doc = await Contact.findOne();

    if (!doc) {
      doc = await Contact.create({});
    }

    Object.assign(doc, req.body);
    await doc.save();

    res.json({ success: true, data: doc });
  } catch (err) {
    console.error("❌ CONTACT SAVE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
