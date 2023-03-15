import connectDB from "../../../utils/connectDB";
import Post from "../../../models/Post";
import { withAuth } from "../../../utils/auth";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await connectDB();
      const { id, title, content, image } = req.body;
      const post = await Post.findById(id);
      if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
      if (post.creator.toString() !== req.user.uid) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }
      try {
        post.title = title;
        post.content = content;
        post.image = image;
        await post.save();
        res.status(200).json({ message: "Post updated", data: post });
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
