import express from "express"
import { disable, enable, finduser, insertuser, login, loguser, register, userss } from "../controllers/usercontroller.js"
import { Router } from "express"
import { mycoll } from "../database/db.js"
 const router=express.Router()

router.get("/register",register)
router.get("/login",login)

router.get("/users",userss)

router.post("/registeruser",insertuser)
router.post("/loginuser",finduser)
router.get("/logout",loguser)
router.get("/users/:id/enable",enable)
router.get("/users/:id/disable",disable)
export default router