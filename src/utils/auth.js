import admin from "./firebase";
// sample axios call in frontend:
// const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/<path>`, ,{
//   headers: {
//     "x-auth-token": authToken,
//   }
// });

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers["x-auth-token"];
      if (!token) {
        return res.status(401).end("No access token, access denied");
      }

       const user = await admin.auth().verifyIdToken(token);
      
      if (!user) {
        return res.status(401).end("Invalid token, access denied");
      }
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(500).end(err.message);
    }
  };
}