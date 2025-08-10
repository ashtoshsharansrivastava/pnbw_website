import Property from "../models/Property.js";

// GET all properties
export const listProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    console.error("Error listing properties:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET a single property by ID
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST create a new property
export const createProperty = async (req, res) => {
  try {
    const {
      title,
      city,
      address,
      price,
      status,
      brokerId,
      quickFacts,
      lat,
      lng
    } = req.body;

    // Handle images (uploaded files)
    const images = req.files
      ? req.files.map(file => ({
          url: `/uploads/${file.filename}`,
          caption: file.originalname
        }))
      : [];

    const parsedQuickFacts = quickFacts
      ? JSON.parse(quickFacts).map(fact => ({ label: fact }))
      : [];

    const property = new Property({
      title,
      city,
      address,
      price,
      status,
      brokerId,
      images,
      quickFacts: parsedQuickFacts,
      location: { lat, lng }
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server error" });
  }
};
