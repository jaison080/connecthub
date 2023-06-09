import User from "../../../models/User";
import connectDB from "../../../utils/connectDB";
import { withAuth } from "../../../utils/auth";
import Post from "../../../models/Post";
async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      let { title, content, image } = req.body;
      if(!image)
      {
        image="";
      }
      const { uid } = req.user;
      const user = await User.findOne({ uid: uid });
      const post = new Post({
        title,
        content,
        image,
        creator: user._id,
      });

      const data = await post.save();
      user.posts.push(data._id);
      await user.save();
      res.status(200).json({ message: "Post added", data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
