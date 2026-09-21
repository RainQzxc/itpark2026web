import Director from "../models/Director.js";
import { cleanText, cleanUrl, pickFields, sanitizeRichHtml } from "../utils/contentSecurity.js";

const cleanDirectorPayload = (body = {}) => {
  const picked = pickFields(body, ["title", "text", "name", "position", "image"]);
  return {
    title: cleanText(picked.title, 200),
    text: sanitizeRichHtml(picked.text, 30000),
    name: cleanText(picked.name, 160),
    position: cleanText(picked.position, 160),
    image: cleanUrl(picked.image),
  };
};

// GET DIRECTOR
export const getDirector = async (req, res) => {
  try {
    let doc = await Director.findOne();

    // If no document → create empty
    if (!doc) {
      doc = await Director.create({});
    }

    res.json(doc);

  } catch (err) {
    console.error("GET Director ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// SAVE / UPDATE DIRECTOR
export const saveDirector = async (req, res) => {
  try {
    let doc = await Director.findOne();

    if (!doc) {
      doc = new Director({});
    }

    const payload = cleanDirectorPayload(req.body);

    doc.title = payload.title || doc.title;
    doc.text = payload.text || doc.text;
    doc.name = payload.name || doc.name;
    doc.position = payload.position || doc.position;
    doc.image = payload.image || doc.image;

    await doc.save();
    res.json({ success: true, data: doc });

  } catch (err) {
    console.error("SAVE Director ERROR:", err);
    res.status(500).json({ error: "Failed to save" });
  }
};
