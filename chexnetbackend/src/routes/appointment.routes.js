import {Router} from "express"
import { protect } from "../middleware/auth.middleware.js";
import {
    bookAppointment,
    fetchUserAppointment,
    fetchDoctorAppointment,
    toggleAppointment
} from "../controllers/appointment.controller.js"

const router=Router()

router.route("/bookappointment").post(protect,bookAppointment)
router.route("/getuserappointment").get(protect,fetchUserAppointment)
router.route("/getdoctorappointment").get(protect,fetchDoctorAppointment)
router.route("/toggleappointment/:id").post(protect,toggleAppointment)

export default router
