// Dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
// Local imports
const routes = require("./routes")

// Express app initialisation
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));

// Express routes
app.use("/", routes);

// Server starting
const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
