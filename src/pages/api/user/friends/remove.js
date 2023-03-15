import User from "../../../../models/User";
import { withAuth } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";

async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await connectDB();
      const { uid } = req.user;
      const { friendId } = req.body;
      const user = await User.findOne({ uid: uid });
      const friend = await User.findOne({ _id: friendId });

      if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.friends = user.friends.filter(
        (friend) => friend.toString() !== friendId
      );
      friend.friends = friend.friends.filter(
        (friend) => friend.toString() !== user._id.toString()
      );
      await user.save();
      await friend.save();

      res.status(200).json({ message: "Friend removed", data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
