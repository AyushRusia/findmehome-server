import mongoose, { Schema } from "mongoose";

const landlordSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  phone: { type: String, default: "" },
  city: { type: String, default: "" },
  address: { type: String, default: "" },
  houseCount: { type: Number, default: 0 },
  house: [
    {
      type: Schema.Types.ObjectId,
      ref: "House",
    },
  ],
  photo: { type: String, default: "" },
});

const landlordModel = new mongoose.model("landlord", landlordSchema);

export default landlordModel;
