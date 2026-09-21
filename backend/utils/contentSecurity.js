import sanitizeHtml from "sanitize-html";

const MAX_TEXT_LENGTH = 5000;
const MAX_HTML_LENGTH = 80000;
const MAX_ARRAY_ITEMS = 80;

const hasUnsafeKey = (value) => {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(hasUnsafeKey);

  return Object.entries(value).some(([key, child]) => (
    key.startsWith("$") ||
    key.includes(".") ||
    key === "__proto__" ||
    key === "constructor" ||
    key === "prototype" ||
    hasUnsafeKey(child)
  ));
};

export const rejectUnsafeBody = (req, res, next) => {
  if (hasUnsafeKey(req.body)) {
    return res.status(400).json({ success: false, message: "Malformed request body" });
  }

  return next();
};

export const pickFields = (source = {}, fields = []) =>
  fields.reduce((acc, field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      acc[field] = source[field];
    }
    return acc;
  }, {});

export const cleanText = (value, maxLength = MAX_TEXT_LENGTH) => {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string" && typeof value !== "number" && typeof value !== "boolean") {
    return "";
  }

  return String(value).replace(/\0/g, "").trim().slice(0, maxLength);
};

export const cleanBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return false;
};

export const cleanNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const cleanUrl = (value, fallback = "") => {
  const text = cleanText(value, 2048);
  if (!text) return fallback;
  if (text === "#") return text;
  if (text.startsWith("/")) return text;

  try {
    const url = new URL(text);
    return ["http:", "https:"].includes(url.protocol) ? url.toString() : fallback;
  } catch {
    return fallback;
  }
};

export const cleanStringArray = (value, maxItems = MAX_ARRAY_ITEMS) => {
  const list = Array.isArray(value) ? value : [];
  return list
    .slice(0, maxItems)
    .map((item) => cleanText(item, 1000))
    .filter(Boolean);
};

export const sanitizeRichHtml = (value, maxLength = MAX_HTML_LENGTH) =>
  sanitizeHtml(String(value ?? "").replace(/\0/g, "").slice(0, maxLength), {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "blockquote",
      "a",
      "img",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: {
      img: ["http", "https"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank",
      }),
    },
  });
