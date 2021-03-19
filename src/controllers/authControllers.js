import landlordModel from "../models/landlord.js";
import tenantModel from "../models/tenant.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const landlordRegister = async (req, res) => {
  try {
    const { name, email, password, city, address, phone, photo } = req.body;

    //checking for email
    const tuser = await landlordModel.findOne({ email });
    if (tuser) return res.status(400).json({ error: "email is taken" });

    //hashing password
    const hashPassword = await bcrypt.hash(password, process.env.SALT_ROUND);

    const user = await new landlordModel({
      name: name,
      email: email,
      password: hashPassword,
      city: city,
      address: address,
      phone: phone,
      photo: photo,
    });

    const data = await user.save();

    res.status(201).json({ _id: data._id, email: data.email });
  } catch (e) {
    console.log(e);
    res.status(400).send("Something Went Wrong");
  }
};

export const tenantRegister = async (req, res) => {
  try {
    const { name, email, password, city, address, phone, gender } = req.body;

    //checking for email
    const tuser = await tenantModel.findOne({ email });
    if (tuser) return res.status(400).json({ error: "email is taken" });

    //hashing password
    const hashPassword = await bcrypt.hash(password, process.env.SALT_ROUND);

    const user = await new tenantModel({
      name: name,
      email: email,
      password: hashPassword,
      city: city,
      address: address,
      phone: phone,
      gender: gender,
    });

    const data = await user.save();

    res.status(201).json({ _id: data._id, email: data.email });
  } catch (e) {
    console.log(e);
    res.status(400).send("Something Went Wrong");
  }
};

export const login = async (req, res) => {
  try {
    const { role, email, password } = req.body;
    let user;

    //checking role of user
    if (role === "tenant") {
      user = await tenantModel.findOne({ email });
      if (!user) return res.status(400).json({ error: "User Not found" });
    } else {
      user = await landlordModel.findOne({ email });
      if (!user) return res.status(400).json({ error: "User Not found" });
    }

    //verifying password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ error: "Password Not Matched" });

    //generating token
    const token = await jwt.sign({ user: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    //setting cookies
    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
    });

    //sending response
    res.status(201).json({
      isLoggedIn: true,
      token,
      id: user._id,
      email: user.email,
    });
  } catch (e) {
    console.log(e);
  }
};
