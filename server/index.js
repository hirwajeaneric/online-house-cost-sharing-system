require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const adminRoutes = require('./routes/admin.routes');
const tenantRoutes = require('./routes/tenant.routes');
const houseRoutes = require('./routes/house.routes');
const joinRequestRoutes = require('./routes/joinRequest.routes');
const joinRequirementsRoutes = require('./routes/joinRequirement.routes');

connection();

app.use(express.json());
app.use(cors());

//Routes
app.use('/api/uploads/', express.static('./uploads'));
app.use('/api/admin/', adminRoutes);
app.use('/api/tenant/', tenantRoutes);
app.use('/api/house/', houseRoutes);
app.use('/api/joinRequest/', joinRequestRoutes);
app.use('/api/joinRequirements/', joinRequirementsRoutes);

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));