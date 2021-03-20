import mongoose from "mongoose";
const { Schema } = mongoose;

const houseSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  city: { type: String, default: "" },
  address: { type: String, default: "" },
  rent: { type: Number, default: 0 },
  dimensions: { type: String, default: "900sqft" },
  houseType: { type: String, default: "2BHK" },
  owner: { type: Schema.Types.ObjectId, ref: "landlord" },
  totalSharing: { type: Number },
  currentSharing: { type: Number, default: 0 },
  status: { type: String, enum: ["FULL", "EMPTY"], default: "EMPTY" },
  tenant: [
    {
      type: Schema.Types.ObjectId,
      ref: "tenant",
    },
  ],
  description: { type: String, default: "" },
});

const houseModel = new mongoose.model("house", houseSchema);

export default houseModel;
