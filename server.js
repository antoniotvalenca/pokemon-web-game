require('./src/database');

const express = require('express');
const app = express();

const userRoutes = require('./src/routes/userRoutes');

app.use(express.json());
app.use(userRoutes);

app.listen(8888, () => {
    console.log("Listening on port 8888");
});