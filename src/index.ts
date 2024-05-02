import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRouter from "./routes/MyUserRoute";
import {v2 as cloudinary} from "cloudinary";
import myRestaurantRouter from "./routes/MyRestaurantRoute";
import restaurantRouter from "./routes/RestaurantRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log(`connected to DB`))
  .catch(err => console.log(`connection failed ${err}`))

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", async(req: Request, res: Response) => res.json({ message: "Hello Foodjagat.com ." }));

app.use("/api/my/user", myUserRouter);
app.use("/api/my/restaurant", myRestaurantRouter);
app.use("/api/restaurant", restaurantRouter);

app.listen(5000, () =>  console.log("server runs at port 5000"));