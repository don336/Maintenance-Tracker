import express from 'express';
import controllers from '../controllers/userRequest.js'

const router = express.Router();

router.get("/", controllers.getRequests)
router.get("/:id", controllers.getRequest)
router.post("/", controllers.createRequest)
router.put("/:id", controllers.updateRequest)

export default router