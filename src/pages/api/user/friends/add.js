import User from "../../../../models/User";
import { withAuth } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const { uid } = req.user;
      const { friendId } = req.body;
      const user = await User.findOne({ uid: uid });
      const friend = await User.findOne({ uid: friendId });

      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.friends.push(friend._id);
      friend.friends.push(user._id);
      await user.save();
      await friend.save();

      res.status(200).json({ message: "Friend added", data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
