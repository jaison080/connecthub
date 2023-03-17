import Fuse from "fuse.js";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;
    if (!id) {
      const users = await User.find({});
      return res.status(200).send(users);
    }
    const users = await User.find({
      $or: [{ name: { $regex: id, $options: "i" } }, { email: id }],
    });
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
