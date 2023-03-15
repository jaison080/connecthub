import { connectDB } from "../../../../utils/connectDB";
import { withAuth } from "../../../../utils/auth";
import User from "../../../../models/User";

async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      await connectDB();

      const { uid } = req.user;
      const { name, image } = req.body;

      const user = await User.findOne({ uid: uid });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.name = name;
      user.image = image;
      await user.save();

      res.status(200).json({ message: "User updated", data: user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
