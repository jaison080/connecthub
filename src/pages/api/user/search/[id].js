import Fuse from "fuse.js";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
export default async function handler(req, res) {
  try {
    await connectDB();
    const { id } = req.query;
    const users = await User.find({});
    const options = {
      keys: ["name"],
    };

    const fuse = new Fuse(users, options);
    const pattern = id;
    fuse.search(pattern);
    let temp = [];
    fuse.search(pattern).map((user) => {
        temp.push(user.item);
    });
    res.status(200).send(temp);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
