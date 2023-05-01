import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = 5000;

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));


