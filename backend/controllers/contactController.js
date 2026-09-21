import Contact from "../models/Contact.js";
import { cleanStringArray, cleanText, pickFields } from "../utils/contentSecurity.js";

const cleanContactPayload = (body = {}) => {
  const picked = pickFields(body, [
    "page_title",
    "motto_title",
    "motto_text",
    "vision_title",
    "vision_text",
    "mission_title",
    "mission_text",
    "priority_title",
    "priority_list",
    "duty_title",
    "duty_text",
    "strategy_title",
    "strategy_text",
    "values",
    "strategies",
    "directions",
  ]);

  return {
    page_title: cleanText(picked.page_title, 200),
    motto_title: cleanText(picked.motto_title, 200),
    motto_text: cleanText(picked.motto_text, 2000),
    vision_title: cleanText(picked.vision_title, 200),
    vision_text: cleanText(picked.vision_text, 2000),
    mission_title: cleanText(picked.mission_title, 200),
    mission_text: cleanText(picked.mission_text, 2000),
    priority_title: cleanText(picked.priority_title, 200),
    priority_list: cleanStringArray(picked.priority_list),
    duty_title: cleanText(picked.duty_title, 200),
    duty_text: cleanText(picked.duty_text, 2000),
    strategy_title: cleanText(picked.strategy_title, 200),
    strategy_text: cleanText(picked.strategy_text, 2000),
    values: cleanStringArray(picked.values),
    strategies: cleanStringArray(picked.strategies),
    directions: Array.isArray(picked.directions)
      ? picked.directions.slice(0, 40).map((direction) => ({
          value: cleanText(direction?.value, 200),
          items: cleanStringArray(direction?.items),
        }))
      : [],
  };
};

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

    Object.assign(doc, cleanContactPayload(req.body));
    await doc.save();

    res.json({ success: true, data: doc });
  } catch (err) {
    console.error("❌ CONTACT SAVE ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
