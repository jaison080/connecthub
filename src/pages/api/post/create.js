import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { withAuth } from "../../../utils/auth";
import Post from "../../../models/Post";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const { title, content, image } = req.body;
      const { uid } = req.user;
      const user = await User.findOne({ uid: uid });
      const post = new Post({
        title: title,
        content: content,
        image: image,
        creator: user._id,
      });
      const data = await post.save();
      res.status(200).json({ message: "Post added", data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

export default withAuth(handler);
