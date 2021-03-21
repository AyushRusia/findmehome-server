import houseModel from "../../models/house.js";
import landlordModel from "../../models/landlord.js";
import tenantModel from "../../models/tenant.js";
const queries = {
  getAllLandlords: async (Args, req) => {},

  getAllTenants: async (Args, req) => {},

  getAllHouses: async (Args, req) => {
    const houses = await houseModel.find();

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
  getMyTenants: async (Args, req) => {
    try {
      const userId = req.userId;
      //const landlord = await landlordModel.findById(userId);
      const house = await houseModel.findById(Args.HouseId);

      const tenantsIds = house.tenant;
      const tenants = await tenantModel.find({ _id: { $in: tenantsIds } });

      return tenants;
    } catch (e) {
      console.log(e);
    }
  },
  getBookedHouse: async (Args, req) => {
    try {
      const userId = req.userId;
      const tenant = await tenantModel.findById(userId);
      if (!tenant.bookedHouse) return new Error("No House Found");
      const houseId = tenant.bookedHouse;
      const house = await houseModel.findById(houseId);
      return house;
    } catch (e) {
      console.log(e);
    }
  },
};

export default queries;
