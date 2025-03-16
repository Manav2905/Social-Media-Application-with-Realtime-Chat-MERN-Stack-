const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    if (!url) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log(`🟡 Connecting to MongoDB at: ${url}`);

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });

    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  }
};

// Handle unexpected disconnections
mongoose.connection.on("disconnected", () => {
  console.error("❌ MongoDB disconnected. Reconnecting...");
  connectDB();
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

// Export the connection function
module.exports = connectDB;
