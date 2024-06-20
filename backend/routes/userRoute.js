import express from 'express';
import { registerUser, loginUser } from '../controller/userController.js';  // Importing the registerUser and loginUser functions from the userController.js file
const userRouter = express.Router();
userRouter.post("/register", registerUser);  // Registering the registerUser function to the /register route
userRouter.post("/login", loginUser);  // Registering the loginUser function to the /login route
export default userRouter;  // Exporting the userRouter object