const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/enquiries', require('./routes/enquiries'));
// ... interns, broker, admin

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
