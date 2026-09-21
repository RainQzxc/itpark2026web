import DOMPurify from "dompurify";

export const sanitizeHtml = (html = "") =>
  DOMPurify.sanitize(String(html || ""), {
    ALLOWED_TAGS: [
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
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "title", "class"],
    ALLOWED_URI_REGEXP: /^(?:(?:https?|mailto):|\/)/i,
  });
