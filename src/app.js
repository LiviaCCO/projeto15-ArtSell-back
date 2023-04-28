import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (req, res) => {
  return res.send("pong");
});

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));