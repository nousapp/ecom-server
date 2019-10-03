const express = require('express');
const cors = require('cors');
const router = require('./middleware/routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Adds the router middleware
app.use(cors());
app.use(express.json()); //parse request with JSON bodies
app.use(router);
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log('Care Server running on port 5000');
});