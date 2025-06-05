require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const applicationRoutes = require('./routes/applicationRoutes');

app.use(bodyParser.json());
app.use('/api/applications', applicationRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});