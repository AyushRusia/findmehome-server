import houseModel from "../../models/house.js";
import landlordModel from "../../models/landlord.js";
import tenantModel from "../../models/tenant.js";
const queries = {
  getAllLandlords: async (Args, req) => {},

  getAllTenants: async (Args, req) => {},

  getAllHouses: async (Args, req) => {
    const houses = await houseModel.find();
    console.log(houses);
    return houses.map((house) => {
      return {
        ...house._doc,
      };
    });
  },
  getMyHouses: async (Args, req) => {
    const userId = req.userId;
    const landlord = await landlordModel.findById(userId);
    const houseIds = landlord.house;
    const houses = await houseModel.find({ _id: { $in: houseIds } });
    return houses;
  },
};

export default queries;
