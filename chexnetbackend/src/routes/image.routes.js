import {Router} from "express"
import {upload} from "../middleware/multer.middleware.js"
import {uploadImage,getImages} from "../controllers/image.controller.js"
import { protect } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/upload").post(
    protect,
    upload.single('xrayimage'),
    uploadImage
    )
router.route("/getimages").get(protect,getImages)

export default router