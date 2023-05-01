import { Router } from "express";
import { signIn, signUp, logout } from "../controllers/userControllers.js";
import authValidation from "../middlewares/auth.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { registerSchema, loginSchema } from "../schemas/userSchema.js";

const userRoutes = Router();

userRoutes.post("/sign-up", validateSchema(registerSchema), signUp);
userRoutes.post("/login", validateSchema(loginSchema), signIn);
userRoutes.post("/logout", authValidation, logout);

export default userRoutes;


