import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const posts = await User.find({});
      if (!posts) {
        return res.status(404).json({ message: "Users not found" });
      }
      res.status(200).send(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default handler;
