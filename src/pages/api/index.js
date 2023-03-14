import connectDB from "../../utils/connectDB";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      res.status(200).json({ message: "Connected to DB" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
