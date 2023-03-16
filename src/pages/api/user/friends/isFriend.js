import { withAuth } from "@/utils/auth";
import User from "../../../../models/User";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    const { uid } = req.user;
    const friendsList = await User.findOne({ uid: uid }).friends;
    if (!friendsList) {
      return res.status(200).json({ isFriend: false });
    }
    if (friendsList?.includes(id)) {
      return res.status(200).json({ isFriend: true });
    } else {
      return res.status(200).json({ isFriend: false });
    }
  }
}

export default withAuth(handler);
