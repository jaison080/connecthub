import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import {withAuth} from "../../../utils/auth";

async function handler(req, res) {
  if (req.method == "POST") {
    try {
      await connectDB();
      const { name } = req.body;
      const { email, uid, picture } = req.user;
      const prevuser = await User.findOne({ uid: uid });
      if (prevuser) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      const user = new User({
        name: name,
        email: email,
        uid: uid,
        image: picture,
        likedposts: [],
      });
      const data = await user.save();
      res.status(200).json({ message: "User added", data });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
