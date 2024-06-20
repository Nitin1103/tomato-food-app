import express from 'express';
import { addFood, listFood, removeFood } from '../controller/foodController.js';  // Importing the addFood function from the foodController.js file

import multer from 'multer';  // Importing multer for file upload
const foodRouter = express.Router();
// image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: ((req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);  // File name for the image
    })
});

const upload = multer({ storage: storage });  // Uploading the image

foodRouter.post('/add', upload.single("image"), addFood);  // POST request to add a food item

foodRouter.get('/list', listFood);  // GET request to list all food items

foodRouter.post("/remove", removeFood); // DELETE request to remove a food item

export default foodRouter;  // Exporting the foodRouter