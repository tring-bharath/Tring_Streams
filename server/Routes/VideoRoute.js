const express = require("express");
const router = express.Router();
const {
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
} = require("../Controllers/VideoController");

router.post("/insert", insertVideo);
router.post("/insertHistory", insertHistory);
router.get("/watchList/:userId", getWatchList);
router.get("/history/:userId", getHistory);
router.delete("/removeFromWatchList/:id", removeFromWatchList);
router.delete("/removeFromHistory/:id", removeFromHistory);
router.post("/insertmany", insertManyVideos);
router.get("/getAllVideos", getAllVideos);
router.put("/updateViews/:videoId", updateViews);
router.get("/carousel", getCarousel);
router.get("/search", searchVideos);

module.exports = router;
