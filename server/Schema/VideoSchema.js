const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    id:{type:Number,unique:true},
    tags: { type: String }, 
    videoURL: { type: String, required: true },
    thumbnail: { type: String, required: true }, 
    likes: { type: Number },
    views: { type: Number }
});

const videoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    id: { type: Number, required: true },
    tags: { type: String }, 
    videoURL: { type: String },
    thumbnail: { type: String}, 
    likes: { type: Number },
    views: { type: Number }
});

videoSchema.index({ userId: 1, id: 1 }, { unique: true });
const videoModel = mongoose.model("watchList", videoSchema);
const HistoryModel= mongoose.model("history",videoSchema);
const AllModel= mongoose.model("allVideos",schema);
module.exports = {videoModel,HistoryModel,AllModel};