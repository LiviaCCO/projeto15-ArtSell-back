import { Router } from "express"
import userRoutes from "./userRoutes.js"
//import artSellRoutes from "./artSellRoutes.js"

const router = Router()
router.use(userRoutes)
/* router.use(artSellRoutes) */

export default router