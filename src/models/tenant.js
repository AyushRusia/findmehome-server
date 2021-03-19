import mongoose from "mongoose";
const { Schema } = mongoose;
const tenantSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  phone: { type: String, default: "" },
  city: { type: String, default: "" },
  address: { type: String, default: "" },
  gender: { type: String, enum: ["MALE", "FEMALE"] },
  bookedHouse: { type: Schema.Types.ObjectId, ref: "House" },
});

const tenantModel = new mongoose.model("tenant", tenantSchema);

export default tenantModel;
