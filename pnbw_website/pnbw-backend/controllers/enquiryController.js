import Enquiry  from "../models/Enquiry.js";
import Property from "../models/Property.js";

/* POST /api/enquiries { propertyId, message } */
export const createEnquiry = async (req, res) => {
  const { propertyId, message } = req.body;

  if (!propertyId) return res.status(400).json({ message: "propertyId required" });

  const property = await Property.findById(propertyId).select("brokerId");
  if (!property) return res.status(404).json({ message: "Property not found" });

  const enquiry = await Enquiry.create({
    propertyId,
    brokerId: property.brokerId,
    userId:   req.user._id,
    message,
    contactSnapshot: {
      name:  req.user.name,
      phone: req.user.phone,
      email: req.user.email
    }
  });

  res.status(201).json(enquiry);
};

/* GET /api/brokers/:id/enquiries (broker dashboard) */
export const listForBroker = async (req, res) => {
  const brokerEnquiries = await Enquiry.find({ brokerId: req.params.id })
    .populate("propertyId", "title price")
    .populate("userId", "name phone");
  res.json(brokerEnquiries);
};
