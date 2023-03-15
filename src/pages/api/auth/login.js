import connectDB from "../../../utils/connectDB";
import { withAuth } from "../../../utils/auth";
import User from "../../../models/User";
async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const user = await User.findOne({ uid: req.user.uid });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  else
  {
    res.status(405).json({ message: "Method not allowed" });
  }
}
export default withAuth(handler);
