import BrokerStats from "../models/BrokerStats.js";
import Property    from "../models/Property.js";

/* GET /api/brokers/:id/stats */
export const getStats = async (req, res) => {
  const stats =
    (await BrokerStats.findOne({ brokerId: req.params.id })) ||
    (await BrokerStats.create({ brokerId: req.params.id }));
  res.json(stats);
};

/* GET /api/brokers/:id/listings */
export const getListings = async (req, res) => {
  const listings = await Property.find({ brokerId: req.params.id }).select(
    "title status price address id"
  );
  res.json(listings);
};
