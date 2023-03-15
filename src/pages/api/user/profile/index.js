import User from "../../../../models/User";
import connectDB from "../../../../utils/connectDB";
async function handler(req, res) {
  if (req.method === "GET") {
    const { uid } = req.user;
    try {
      await connectDB();
      const user = await User.findOne({ uid: uid });
      res.status(200).json({ message: "User found", data: user });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(500).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
