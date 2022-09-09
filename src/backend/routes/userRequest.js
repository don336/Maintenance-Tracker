import express from 'express';
import controllers from '../controllers/userRequest.js'
import CheckAuth from "../middleware/check-Auth.js"
import validate from "../validation/validate.js"

const router = express.Router();

router.get("/", controllers.getRequests)
router.get("/user/", CheckAuth,controllers.getRequests)
router.get("/:id",CheckAuth, controllers.getRequest)
router.post("/", CheckAuth, validate.requestValidation,controllers.createRequest)
router.put("/:id", CheckAuth,validate.updateRequest, controllers.updateRequest)
router.put("/:id/approve", controllers.approveRequest)
router.put("/:id/disapprove", controllers.disapproveRequest)
router.put("/:id/resolve", controllers.resolveRequest)

export default router