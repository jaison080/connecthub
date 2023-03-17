import Post from "@/models/Post";
import User from "../../../../models/User";
import { withAuth } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const { uid } = req.user;
      const { postId } = req.body;
      const user = await User.findOne({ uid: uid });
      const post = await Post.findOne({ _id: postId })

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.likedposts.push(postId);
      post.likes.push(user._id);
      await user.save();

      await post.save();

      res.status(200).json({ message: "Post liked", data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
