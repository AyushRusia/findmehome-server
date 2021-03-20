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
};

export default queries;
