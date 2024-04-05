import express from "express";
import MyRestaurantController from "../controllers/MyRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middlewares/auth";
import { validateMyRestaurantRequest } from "../middlewares/validation";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  }
});

// GET /api/my/restaurant
router.get('/', jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);
// POST /api/my/restaurant
router.post('/', upload.single('imageFile'), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.createMyRestaurant);
// PUT /api/my/restaurant
router.put('/', upload.single('imageFile'), validateMyRestaurantRequest, jwtCheck, jwtParse, MyRestaurantController.updateMyRestaurant);


export default router;