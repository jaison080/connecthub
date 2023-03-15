import connectDB from "../../../utils/connectDB";
import Post from "../../../models/Post";
import { withAuth } from "../../../utils/auth";
import User from "../../../models/User";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await connectDB();
      const { id } = req.body;
      const { uid } = req.user;
      const post = await Post.findById(id);
      const user = await User.findOne({ uid: uid });
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      if (post.creator.toString() !== user._id.toString()) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }
      try {
        await Post.findByIdAndDelete(id);
        user.posts.pull(post._id);
        res.status(200).json({ message: "Post deleted" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}
export default withAuth(handler);
