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

const seedIndianDatabase = async () => {
  try {
    console.log("Seeding data with Indian names...");

    const indianNames = [
      "Amit Sharma", "Priya Verma", "Rajesh Kumar", "Ananya Patel",
      "Vikram Singh", "Neha Gupta", "Rahul Choudhary", "Sakshi Mehta",
      "Arjun Reddy", "Pooja Iyer"
    ];

    let users = [];
    for (let i = 0; i < 10; i++) {
      users.push({
        username: indianNames[i].toLowerCase().replace(/\s/g, ""),
        email: `user${i + 1}@example.com`,
        password: "password123",
      });
    }
    const createdUsers = await User.insertMany(users);

    const posts = [
      { title: "Exploring the Beauty of Jaipur", content: "Jaipur, the pink city of India, is known for its rich heritage, grand palaces, and vibrant markets. From the historic Amer Fort to the bustling streets of Johari Bazaar, every corner of the city tells a story of its royal past." },
      { title: "The Future of AI in India", content: "Artificial Intelligence is rapidly transforming industries in India. With advancements in automation, healthcare, and finance, AI is poised to revolutionize the country’s technological landscape and create new opportunities for growth." },
      { title: "Street Food Adventures in Mumbai", content: "Mumbai’s street food culture is unmatched. From the spicy vada pav to the tangy pani puri, the city’s bustling food stalls serve an array of flavors that reflect its diverse population and rich culinary heritage." },
      { title: "Festivals of India: A Cultural Extravaganza", content: "India is home to some of the most colorful and vibrant festivals in the world. From the lights of Diwali to the colors of Holi, each festival showcases the country’s deep-rooted traditions and unity in diversity." },
      { title: "India's Space Achievements", content: "ISRO has made significant progress in space exploration, launching ambitious missions such as Chandrayaan and Mangalyaan. With upcoming projects like Gaganyaan, India is set to become a major player in the global space industry." },
      { title: "Yoga and Meditation for a Healthy Life", content: "Yoga and meditation, deeply rooted in Indian traditions, offer numerous health benefits. Practicing these ancient techniques helps in reducing stress, improving flexibility, and promoting overall well-being." },
      { title: "Cricket: More Than Just a Sport", content: "Cricket in India is not just a game; it’s an emotion. The sport unites people across the country, from gully cricket matches to thrilling international tournaments, fostering a sense of national pride." },
      { title: "Bollywood: The Heartbeat of Indian Cinema", content: "Bollywood is one of the largest film industries in the world, known for its grand musicals, compelling storytelling, and vibrant performances. It continues to influence global cinema and entertain audiences worldwide." },
      { title: "The Rise of Indian Startups", content: "India’s startup ecosystem is booming, with entrepreneurs launching innovative ventures in technology, e-commerce, and fintech. Companies like Flipkart, Zomato, and Paytm are reshaping the business landscape." },
      { title: "Cultural Diversity in India", content: "India is a land of immense cultural diversity, with each state having its own unique traditions, languages, and customs. From the folk dances of Rajasthan to the classical music of Tamil Nadu, the nation thrives on its cultural richness." },
      { title: "The Beauty of Kerala's Backwaters", content: "Kerala’s backwaters offer a serene escape with lush green landscapes and traditional houseboat cruises. A trip through these tranquil waters provides a glimpse into the state’s scenic beauty and unique way of life." },
      { title: "Traditional Indian Clothing Styles", content: "Indian clothing is a beautiful blend of tradition and elegance. From sarees and lehengas to dhotis and sherwanis, each attire reflects the country’s rich cultural heritage and artistic craftsmanship." },
      { title: "Indian Classical Music: A Legacy", content: "Indian classical music, encompassing Hindustani and Carnatic styles, is an art form that has been passed down through generations. The music, known for its intricate ragas and melodies, continues to mesmerize audiences worldwide." },
      { title: "The Significance of Ayurveda", content: "Ayurveda, India’s ancient system of medicine, focuses on holistic healing and natural remedies. With practices like herbal treatments and yoga, Ayurveda remains relevant in modern healthcare." },
      { title: "Trekking in the Himalayas", content: "The Himalayas offer breathtaking trekking experiences for adventure enthusiasts. From the scenic trails of Himachal Pradesh to the challenging routes of Uttarakhand, the mountains provide unforgettable journeys." },
      { title: "Indian Wedding Traditions", content: "Indian weddings are known for their grandeur and elaborate rituals. From Mehendi and Sangeet ceremonies to the sacred vows, these celebrations are filled with music, dance, and festivity." },
      { title: "Tech Innovations from India", content: "India is making remarkable strides in technology, with advancements in fields like artificial intelligence, digital payments, and space exploration. The country continues to be a global hub for tech innovation." },
      { title: "The Role of Women in Modern India", content: "Women in India are excelling in various fields, breaking stereotypes and leading in sectors such as business, politics, and science. Their contributions continue to shape the future of the nation." },
      { title: "Exploring the Beaches of Goa", content: "Goa is famous for its stunning beaches, vibrant nightlife, and Portuguese-influenced architecture. Whether it's sunbathing at Baga Beach or partying at Anjuna, Goa offers the perfect coastal retreat." },
      { title: "The Magic of Indian Spices", content: "Indian cuisine is incomplete without its aromatic spices. From turmeric and cumin to cardamom and saffron, these ingredients not only enhance flavor but also offer health benefits." }
  ];
  

    const createdPosts = await Post.insertMany(posts.map((post, index) => ({
      poster: createdUsers[index % 10]._id,
      title: post.title,
      content: post.content,
      image: post.image,
    })));

    let comments = [];
    const commentTemplates = [
      "This post is really insightful!", 
      "Loved reading this, very well written!", 
      "Amazing perspective on this topic.", 
      "I never thought about it this way, thanks for sharing!", 
      "Great points made in this post!", 
      "This is so interesting, I learned a lot.", 
      "Wonderful insights, keep it up!", 
      "I completely agree with your views.", 
      "Such a unique take on this subject!", 
      "This post made me think deeply, great work!"
    ];

    for (let i = 1; i <= 100; i++) {
      let userIndex = Math.floor(Math.random() * 10);
      let postIndex = Math.floor(Math.random() * posts.length);
      let commentContent = commentTemplates[Math.floor(Math.random() * commentTemplates.length)];
      comments.push({
        commenter: createdUsers[userIndex]._id,
        post: createdPosts[postIndex]._id,
        content: commentContent,
      });
    }
    await Comment.insertMany(comments);

    let likes = [];
    for (let i = 1; i <= 500; i++) {
      let userIndex = Math.floor(Math.random() * 10);
      let postIndex = Math.floor(Math.random() * posts.length);
      likes.push({
        userId: createdUsers[userIndex]._id,
        postId: createdPosts[postIndex]._id,
      });
    }
    await PostLike.insertMany(likes);

    console.log("✅ Indian dataset inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
};

seedIndianDatabase();
