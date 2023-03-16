import { withAuth } from "@/utils/auth";
import User from "../../../../models/User";

async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;
    const { uid } = req.user;
    const friendsList = User.find({ uid: uid });
    if (friendsList.includes(id)) {
      res.status(200).json({ isFriend: true });
    } else {
      res.status(200).json({ isFriend: false });
    }
  }
}

export default withAuth(handler);
