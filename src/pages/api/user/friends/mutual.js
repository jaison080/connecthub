import { withAuth } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";
async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { uid } = req.user;
      const userFriends = await User.findOne({ uid: uid }).friends;
      //   const mutualFriends = [];
      //   for (let i = 0; i < userFriends.length; i++) {
      //     const friend = await User.findOne({ _id: userFriends[i] });
      //     const friendFriends = friend.friends;
      //     for (let j = 0; j < friendFriends.length; j++) {
      //       if (friendFriends[j] === uid) {
      //         mutualFriends.push(friend);
      //       }
      //     }
      //   }
      //   mutualFriends = await User.findMany({ uid: { $in: mutualFriends } });

      const mutualFriends = await User.find({
        _id: { $in: userFriends },
        friends: uid,
      }).populate("friend");

      res
        .status(200)
        .json({ message: "Mutual friends found", data: mutualFriends });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
