import News from "../models/News.js";
import mongoose from "mongoose";
import {
  cleanText,
  cleanUrl,
  pickFields,
  sanitizeRichHtml,
} from "../utils/contentSecurity.js";

const SLUG_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

const generateSlug = () =>
  Array.from({ length: 5 }, () => SLUG_CHARS[Math.floor(Math.random() * SLUG_CHARS.length)]).join("");

const ensureUniqueSlug = async () => {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const slug = generateSlug();
    const exists = await News.exists({ slug });
    if (!exists) return slug;
  }
  throw new Error("Could not generate unique news slug");
};

const ensureNewsSlug = async (news) => {
  if (!news || news.slug) return news;
  news.slug = await ensureUniqueSlug();
  await news.save();
  return news;
};

const findNewsByIdOrSlug = async (value) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    const byId = await News.findById(value);
    if (byId) return byId;
  }
  return News.findOne({ slug: String(value || "").toLowerCase() });
};

const normalizeSlug = (value) => {
  const slug = cleanText(value, 5).toLowerCase();
  return /^[a-z0-9]{5}$/.test(slug) ? slug : "";
};

const cleanNewsPayload = (body = {}) => {
  const picked = pickFields(body, ["title", "slug", "shortText", "content", "image", "date"]);
  const payload = {
    title: cleanText(picked.title, 200),
    shortText: cleanText(picked.shortText, 600),
    content: sanitizeRichHtml(picked.content),
    image: cleanUrl(picked.image),
  };

  const slug = normalizeSlug(picked.slug);
  if (slug) payload.slug = slug;

  if (picked.date) {
    const date = new Date(picked.date);
    if (!Number.isNaN(date.getTime())) payload.date = date;
  }

  return payload;
};

/* GET ALL */
export const getAllNews = async (req, res) => {
  const list = await News.find().sort({ createdAt: -1 });
  await Promise.all(list.map(ensureNewsSlug));
  res.json(list);
};

/* GET ONE */
export const getSingleNews = async (req, res) => {
  try {
    const item = await ensureNewsSlug(await findNewsByIdOrSlug(req.params.id));
    if (!item) {
      return res.status(404).json({ error: "News not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: err.message || "News not found" });
  }
};

/* CREATE */
export const addNews = async (req, res) => {
  try {
    const payload = cleanNewsPayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ success: false, error: "News title is required" });
    }

    if (!payload.image) {
      return res.status(400).json({ success: false, error: "News image is required" });
    }

    const news = new News({
      ...payload,
      slug: payload.slug || await ensureUniqueSlug(),
    });
    await news.save();
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* UPDATE */
export const updateNews = async (req, res) => {
  try {
    const payload = cleanNewsPayload(req.body);

    if (!payload.title) {
      return res.status(400).json({ success: false, error: "News title is required" });
    }

    if (!payload.image) {
      return res.status(400).json({ success: false, error: "News image is required" });
    }

    const existing = await findNewsByIdOrSlug(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    if (!existing.slug) {
      existing.slug = await ensureUniqueSlug();
      await existing.save();
    }

    const news = await News.findByIdAndUpdate(existing._id, payload, {
      new: true,
      runValidators: true,
    });

    if (!news) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    res.json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* DELETE */
export const deleteNews = async (req, res) => {
  try {
    const existing = await findNewsByIdOrSlug(req.params.id);
    const news = existing ? await News.findByIdAndDelete(existing._id) : null;

    if (!news) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
