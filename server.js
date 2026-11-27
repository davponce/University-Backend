const express = require("express");
const app = express();
const PORT = 3000;
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

const alumnoRoutes = require("./routes/alumnoRoutes");
const authRoutes = require('./routes/authRoutes');

app.use("/api/alumnos", alumnoRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 