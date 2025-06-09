// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const appointmentRoutes = require("./routes/appointmentRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// connectDB();

// app.use("/api", appointmentRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT} 🚀`);
// });


const express = require("express");
const app = express();
const connectDB = require("./config/db");
const appointmentRoutes = require("./routes/appointmentRoutes");
const cors = require("cors");
const adminRoutes = require('./routes/admin');

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", appointmentRoutes);
app.use('/api/admin', adminRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
