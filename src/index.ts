import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRouter from "./routes/MyUserRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log(`connected to DB`))
  .catch(err => console.log(`connection failed ${err}`))

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", async(req: Request, res: Response) => res.json({ message: "Hello FoodJagat.com ." }));

app.use("/api/my/user", myUserRouter);

app.listen(5000, () =>  console.log("server runs at port 5000"));