import Property from "../models/Property.js";

/* GET /api/properties */
export const listProperties = async (_req, res) => {
  const props = await Property.find().select(
    "title city price images status id"
  );
  res.json(props);
};

/* GET /api/properties/:id */
export const getProperty = async (req, res) => {
  const prop = await Property.findById(req.params.id);
  if (!prop) return res.status(404).json({ message: "Not found" });
  res.json(prop);
};
