import Property from "../models/Property.js";

// @desc    Fetch all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({}).populate("agent", "fullName email");
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Fetch single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "agent",
      "fullName email"
    );

    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = async (req, res) => {
  // --- IMPORTANT ---
  // Because we are using multer, text fields are in req.body
  // and uploaded files are in req.files.

  const {
    title,
    description,
    propertyType,
    price,
    units, // Frontend sends 'units', backend needs 'area'
    bedrooms,
    bathrooms,
    furnishing,
    possession,
    builtYear,
    locality, // Frontend sends 'locality' and 'city' separately
    city,
    videoUrls, // Sent as a JSON string
    lat,
    lng,
    amenities, // Sent as a JSON string
    submittedBy,
  } = req.body;

  try {
    // --- Image Upload Logic ---
    // This is a placeholder. In a real app, you would upload req.files to a
    // cloud service like Cloudinary, S3, etc., and get back URLs.
    const imageUrls = req.files.map(file => `https://your-cdn.com/images/${file.originalname}`);
    // For now, we'll just use placeholder URLs based on filenames.
    console.log("Uploaded files:", req.files);
    console.log("Generated Image URLs:", imageUrls);


    // --- Data Mapping and Creation ---
    const property = await Property.create({
      title,
      description,
      propertyType,
      price: Number(price),
      area: Number(units), // Map 'units' from frontend to 'area'
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      furnishing,
      possession,
      builtYear: Number(builtYear),
      location: `${locality}, ${city}`, // Combine locality and city
      locality,
      city,
      images: imageUrls, // Use the URLs from your upload service
      videoUrls: JSON.parse(videoUrls || '[]'), // Parse the JSON string
      amenities: JSON.parse(amenities || '[]'), // Parse the JSON string
      locationCoords: { lat: Number(lat), lng: Number(lng) },
      agent: req.user._id, // Assign the logged-in admin as the agent
      submittedBy,
    });

    res.status(201).json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Server Error while creating property" });
  }
};


// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = async (req, res) => {
  // This function would also need to be updated to handle file uploads
  // if you want to update images. For now, it only updates text fields.
  const {
    title,
    description,
    price,
    location,
    bedrooms,
    bathrooms,
    area,
    images,
  } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      property.title = title || property.title;
      property.description = description || property.description;
      property.price = price || property.price;
      property.location = location || property.location;
      property.bedrooms = bedrooms || property.bedrooms;
      property.bathrooms = bathrooms || property.bathrooms;
      property.area = area || property.area;
      property.images = images || property.images;

      const updatedProperty = await property.save();
      res.json(updatedProperty);
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (property) {
      await property.deleteOne();
      res.json({ message: "Property removed" });
    } else {
      res.status(404).json({ message: "Property not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
