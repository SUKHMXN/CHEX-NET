import Router from "express";
import { 
    authUser,
    getUserProfile,
    logoutUser,
    updateUserProfile,
    registerUser ,
    registerDoctor,
    getDoctors
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/registeruser',registerUser)
router.post('/registerdoctor',registerDoctor)
router.post('/auth',authUser)
router.post('/logout',logoutUser)
router.get('/getdoctors/:city',getDoctors)
router.route("/profile")
.get(protect,getUserProfile)
.post(protect,updateUserProfile)

export default router;