import express from "express";
import jwt from "jsonwebtoken";
import {
  landlordRegister,
  tenantRegister,
  login,
} from "../controllers/authControllers.js";
import landlordModel from "../models/landlord.js";
import tenantModel from "../models/tenant.js";
const router = express.Router();

router.post("/lregister", landlordRegister);

router.post("/tregister", tenantRegister);

router.post("/login", login);
router.get("/logout", async (req, res) => {
  res
    .cookie("token", "", {
      //httpOnly: true,
      expires: new Date(0),
      // sameSite: "None",
      // secure: true,
    })
    .send("Logged Out");
});
router.get("/isloggedIn", async (req, res) => {
  try {
    const token = await req.cookies.token;
    if (!token)
      return res.status(201).json({
        test: "1",
        isLoggedIn: false,
      });

    const verify = await jwt.verify(token, process.env.JWT_SECRET);

    // const user = await landlordModel.findById(verify.user);
    // if (!user)
    //   res.status(201).json({
    //     test: "2",
    //     isLoggedIn: false,
    //   });

    res.status(201).json({
      isLoggedIn: true,
      id: verify.user,
    });
  } catch (e) {
    console.log(e);
    res.json({ test: "3", isLoggedIn: false });
  }
});
export default router;
