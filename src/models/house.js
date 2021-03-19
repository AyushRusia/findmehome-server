import mongoose, { Schema } from "mongoose";

const houseSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  address: { type: String, default: "" },
  rent: { type: Number, default: 0 },
  dimensions: { type: String, default: "" },
  houseType: { type: String, default: "" },
  owner: { type: Schema.Types.ObjectId, ref: "landlord" },
  totalSharing: { type: Number },
  currentSharing: { type: Number, default: 0 },
  tenant: [
    {
      type: Schema.Types.ObjectId,
      ref: "tenant",
    },
  ],
});

const houseModel = new mongoose.model("house", houseSchema);

export default houseModel;
