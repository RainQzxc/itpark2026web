import Partner from "../models/Partner.js";
import cloudinary from "../config/cloudinary.js";

/* GET ALL */
export async function getPartners(req, res) {
  const list = await Partner.find().sort({ order: 1 });
  res.json(list);
}

/* CREATE */
export async function createPartner(req, res) {
  const partner = await Partner.create(req.body);
  res.json({ success: true, partner });
}

/* UPDATE */
export async function updatePartner(req, res) {
  await Partner.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
}

/* DELETE */
export async function deletePartner(req, res) {
  await Partner.findByIdAndDelete(req.params.id);
  res.json({ success: true });
}

/* IMAGE UPLOAD — NEWS STYLE */
export async function uploadPartnerImage(req, res) {
  try {
    if (!req.file) {
      return res.json({ success: false, error: "No image" });
    }

    const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: "itpark/partners",
      public_id: "partner_" + Date.now()
    });

    res.json({
      success: true,
      image: result.secure_url
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}
