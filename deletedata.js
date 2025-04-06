const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const PostLike = require("./models/PostLike");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const deleteAllData = async () => {
  try {
    console.log("🚨 Deleting all users, posts, comments, and likes...");

    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    await PostLike.deleteMany({});

    console.log("✅ All data deleted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  }
};

deleteAllData();
