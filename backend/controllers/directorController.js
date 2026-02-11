import Director from "../models/Director.js";

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

    doc.title = req.body.title ?? doc.title;
    doc.text = req.body.text ?? doc.text;
    doc.name = req.body.name ?? doc.name;
    doc.position = req.body.position ?? doc.position;

    if (req.body.image) {
      doc.image = req.body.image;
    }

    await doc.save();
    res.json({ success: true, data: doc });

  } catch (err) {
    console.error("SAVE Director ERROR:", err);
    res.status(500).json({ error: "Failed to save" });
  }
};
