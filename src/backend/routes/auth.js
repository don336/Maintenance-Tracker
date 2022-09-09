import express from "express"
import controller from "../controllers/user.js"
import validate from "../validation/validate.js"

const router = express.Router();

router.post("/signup",  validate.registration,controller.registerUser);
router.post("/login",  validate.signIn,controller.signIn);
router.get("/signout", controller.signOut);

export default router