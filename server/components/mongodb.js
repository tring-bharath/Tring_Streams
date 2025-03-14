const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors=require('cors');
require('dotenv').config();
const { ObjectId } = require('mongodb');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/Tring_streams")
    .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.error("DB Connection Error:", err));
}



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



const userSchema = new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    username:{type:String},
    phoneNumber:{type:Number},
    gender:{type:String},
    dataOfBirth:{type:Date},
    bio:{type:String},
    location:{type:String}
});

const userModal=mongoose.model("user",userSchema);
const AllModel= mongoose.model("allVideos",schema);

app.post('/registerUser',async (req,res)=>
{
    try{
        const {first_name,last_name,email,password}=req.body;
        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const newUser = new userModal({
            first_name,
            last_name,
            email,
            password
        });
        await newUser.save();
        res.status(200).send(newUser);
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
})

app.post('/loginUser',async(req,res)=>
{
    const {email,password}=req.body;
    try{
        const user=await userModal.findOne({email});
        if(user.password==password)
        {
            res.status(200).send(user)
        }
        else
        {
            res.status(200).send("WrongPassword");
        }
    }
    catch(err)
    {
        res.status(400).send(err.message);
    }
})

app.post('/insert', async (req, res) => {
    try {
        const { userId, id, tags, views, videoURL, thumbnail, likes } = req.body;

        const existingVideo = await videoModel.findOne({ userId, id });
        if (existingVideo) {
            return res.status(400).json({ error: "Video already exists in watchlist" });
        }

        const newVideo = new videoModel({
            userId,
            id,
            tags,
            videoURL,
            thumbnail,
            likes,
            views
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ error: "Duplicate entry: Video already in watchlist" });
        }
        res.status(500).json({ error: err.message });
    }
});


app.post('/insertHistory', async (req, res) => {
    try {
        const { userId,id,tags, views, videoURL,thumbnail, likes } = req.body;
        
        const newVideo = new HistoryModel({
            userId,
            id,
            tags,
            videoURL,
            thumbnail,
            likes,
            views
        });

        const savedVideo = await newVideo.save();
        res.status(201).json(savedVideo);
        
    } catch (err) {
        res.status(200).json({ error: err.message });
        console.log(err.message);    
    }
});

app.get('/watchList/:userId',async(req,res)=>
{
    const userId = req.params.userId;
    try{

        const video=await videoModel.find({userId:userId});
        return res.status(200).send(video)
    }
    catch(err)
    {
        console.log(err.message);   
    }
})

app.get('/history/:userId',async(req,res)=>
    {
        const userId = req.params.userId;
        // userId = new ObjectId(userId);
        console.log(userId);
        
        try{
    
            const video=await HistoryModel.find({userId}).sort({ _id: -1 }).limit(10);
            return res.status(200).send(video)
            
        }
        catch(err)
        {
            console.log(err.message);   
        }
    })

app.delete('/removeFromWatchList/:id',async(req,res)=>
{
    try{
        const id  = req.params.id;

        const deletedVideo=await videoModel.deleteOne({ _id: id });
        return res.status(200).send(deletedVideo);
    }
    catch(err)
    {
        console.log(err.message);
    }
})

app.delete('/removeFromHistory/:id',async(req,res)=>
    {
        try{
            const id  = req.params.id;
    
            const deletedVideo=await HistoryModel.deleteOne({ _id: id });
            return res.status(200).send(deletedVideo);
        }
        catch(err)
        {
            console.log(err.message);
        }
    })

app.post('/insertmany', async (req, res) => {
    try {
        console.log("Request Body:", req.body);

        const videos = req.body.map(video => ({
            id:video.id,
            tags: video.tags,
            videoURL: video.videos.medium.url,
            thumbnail: video.videos.medium.thumbnail,
            likes: video.likes,
            views: video.views
        }));

        const savedVideos = await AllModel.insertMany(videos);
        res.status(201).json({ message: "Videos added successfully", savedVideos });

    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ message: "Error saving data", error: err.message });
    }
});

app.get('/getAllVideos',async (req,res)=>
{
    const page=req.query.page;
    const skip=(page-1)*20;
    
    try
    {
        const savedVideo=await AllModel.find().skip((page-1)*20).limit(20);
        
        res.status(201).send(savedVideo);
    }
    catch(err)
    {
        res.status(500).send({message:err.message})
    }
})
app.put('/updateViews/:videoId',async(req,res)=>
{
    const id=req.params.videoId;
    try{
        const video = await AllModel.findByIdAndUpdate(id,{ $inc: { views: 1 }});
        res.status(203).send(video);
    }
    catch(err)
    {
        res.status(470).send(err.message);
    }
})
app.get('/carousel',async(req,res)=>
{
    try{
        const video=await AllModel.find().sort({views:-1}).limit(10);
        res.status(200).send(video);
    }
    catch(err){
        res.status(401).send({message:"Error in Carousel"});
    }
})
app.get("/search", async (req, res) => {
    try {
      const { tag } = req.query;
  
      const videos = await AllModel.find({
        tags: { $regex: new RegExp(tag, "i") },
      });
  
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  });

module.exports=connectDB();
app.listen(5000, () => console.log("Server running on port 5000"));
