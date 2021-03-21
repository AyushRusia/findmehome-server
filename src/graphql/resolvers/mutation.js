import houseModel from "../../models/house.js";
import landlordModel from "../../models/landlord.js";
import tenantModel from "../../models/tenant.js";
const mutations = {
  createHouse: async (Args, req) => {
    try {
      const { HouseInput } = Args;
      const userId = req.userId;
      const landlord = await landlordModel.findById(userId);
      const house = await new houseModel({
        name: HouseInput.name,
        city: HouseInput.city,
        address: HouseInput.address,
        rent: HouseInput.rent,
        dimension: HouseInput.dimension,
        houseType: HouseInput.houseType,
        owner: userId,
        totalSharing: HouseInput.totalSharing,
      });

      await landlord.house.push(house);
      await landlord.updateOne({
        houseCount: landlord.houseCount++,
      });
      const savedData = await house.save();
      await landlord.save();
      return {
        ...savedData._doc,
      };
    } catch (e) {
      console.log(e);
    }
  },

  createBooking: async (Args, req) => {
    try {
      const { HouseId } = Args;
      const userId = req.userId;
      const tenant = await tenantModel.findById(userId);

      if (tenant.bookedHouse) return new Error("House Already Booked");
      const house = await houseModel.findById(HouseId);

      if (house.status == "FULL") return new Error("House is Full");
      await house.tenant.push(tenant);
      await house.updateOne({
        currentSharing: house.currentSharing++,
      });
      if (house.currentSharing == house.totalSharing) {
        await house.updateOne({
          status: "FULL",
        });
      }

      await tenant.updateOne({
        bookedHouse: house,
      });

      await tenant.save();
      const savedData = await house.save();
      return savedData;
    } catch (e) {
      console.log(e);
    }
  },
};

export default mutations;
