// import expres from "express"
// import verifyToken from "../Middleware/authMiddle.js";

// const router=expres.Router()

// // protected route
// router.get("/profile/protected", verifyToken, (req, res) => {
//   res.status(200).json({
//     messgae: "Hello protected route",
//     userId: req.user, //shows id from acess token
//     endpoint:"/api/users/profile",
//     info:"placeholder for DB",
//     serverTime: new Date().toLocaleDateString(),
//   });
// });

// export default router

import express from 'express';

import verifyToken from '../Middleware/authMiddle.js'; // Secure the route

import { getUserInfo } from '../Controllers/userController.js'; // The controller function



const router = express.Router();



// The base path is /api/users (from server.js)

// ❌ You had: /profile/protected (resulting in /api/users/profile/protected)

// ⭐ FIX: Change it to /me (resulting in the expected /api/users/me)

router.get('/me', verifyToken, getUserInfo);



export default router;