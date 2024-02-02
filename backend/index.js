const express = require('express');
const db = require('./db');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
const flowerRoutes = require('./routes/flowerRoutes')
const cartRoutes = require('./routes/cartRoutes')
const orderRoutes = require('./routes/orderRoutes')
const employeeRoutes = require('./routes/employeeRoutes')
const deliveryRoutes = require('./routes/deliveryRoutes')

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', flowerRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use('/api', employeeRoutes);
app.use('/api', deliveryRoutes);




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
