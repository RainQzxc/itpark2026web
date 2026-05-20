import News from "../models/News.js";

/* GET ALL */
export const getAllNews = async (req, res) => {
  const list = await News.find().sort({ createdAt: -1 });
  res.json(list);
};

/* GET ONE */
export const getSingleNews = async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    res.json(item);
  } catch {
    res.status(404).json({ error: "News not found" });
  }
};

/* CREATE */
export const addNews = async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ success: false, error: "News image is required" });
    }

    const news = new News(req.body);
    await news.save();
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/* UPDATE */
export const updateNews = async (req, res) => {
  try {
    if (!req.body.image) {
      return res.status(400).json({ success: false, error: "News image is required" });
    }

    const news = await News.findByIdAndUpdate(req.params.id, req.body, {
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
    const news = await News.findByIdAndDelete(req.params.id);

    if (!news) {
      return res.status(404).json({ success: false, error: "News not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
