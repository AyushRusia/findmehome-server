import express from "express";

import {
  landlordRegister,
  tenantRegister,
  login,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/lregister", landlordRegister);

router.post("/tregister", tenantRegister);

router.post("/login", login);

export default router;
