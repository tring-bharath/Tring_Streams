const {videoModel,HistoryModel,AllModel} = require("../Schema/VideoSchema");
// const HistoryModel = require("../Schema/VideoSchema");
// const AllModel = require("../Schema/VideoSchema");

const insertVideo = async (req, res) => {
  try {
    const { userId, id, tags, views, videoURL, thumbnail, likes } = req.body;
    const existingVideo = await videoModel.findOne({ userId, id });
    if (existingVideo) {
      return res.status(400).json({ error: "Video already exists in watchlist" });
    }
    const newVideo = new videoModel({ userId, id, tags, videoURL, thumbnail, likes, views });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertHistory = async (req, res) => {
  try {
    const { userId, id, tags, views, videoURL, thumbnail, likes } = req.body;
    const newVideo = new HistoryModel({ userId, id, tags, videoURL, thumbnail, likes, views });
    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWatchList = async (req, res) => {
  const userId = req.params.userId;
  try {
    const video = await videoModel.find({ userId });
    res.status(200).send(video);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getHistory = async (req, res) => {
  const userId = req.params.userId;
  try {
    const video = await HistoryModel.find({ userId }).sort({ _id: -1 }).limit(10);
    res.status(200).send(video);
  } catch (err) {
    console.log(err);
    
    res.status(500).send(err.message);
  }
};

const removeFromWatchList = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVideo = await videoModel.deleteOne({ _id: id });
    res.status(200).send(deletedVideo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const removeFromHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVideo = await HistoryModel.deleteOne({ _id: id });
    res.status(200).send(deletedVideo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const insertManyVideos = async (req, res) => {
  try {
    const videos = req.body.map(video => ({
      id: video.id,
      tags: video.tags,
      videoURL: video.videos.medium.url,
      thumbnail: video.videos.medium.thumbnail,
      likes: video.likes,
      views: video.views,
    }));
    const savedVideos = await AllModel.insertMany(videos);
    res.status(201).json({ message: "Videos added successfully", savedVideos });
  } catch (err) {
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
};

const getAllVideos = async (req, res) => {
  const page = req.query.page;
  const skip = (page - 1) * 20;
  try {
    const savedVideo = await AllModel.find().skip(skip).limit(20);
    res.status(200).send(savedVideo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateViews = async (req, res) => {
  const id = parseInt(req.params.videoId);
  try {
    const video = await AllModel.findOneAndUpdate({id:id}, { $inc: { views: 1 } });
    res.status(200).send(video);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getCarousel = async (req, res) => {
  try {
    const video = await AllModel.find().sort({ views: -1 }).limit(10);
    
    res.status(200).send(video);
  } catch (err) {
    console.log(err);
    
    res.status(500).send({ message: err.message });
  }
};

const searchVideos = async (req, res) => {
  try {
    const { tag } = req.query;
    const videos = await AllModel.find({ tags: { $regex: new RegExp(tag, "i") } });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  insertVideo,
  insertHistory,
  getWatchList,
  getHistory,
  removeFromWatchList,
  removeFromHistory,
  insertManyVideos,
  getAllVideos,
  updateViews,
  getCarousel,
  searchVideos,
};
