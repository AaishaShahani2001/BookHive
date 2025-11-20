import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserRoutes from "./routes/userRoutes.js"; 
import bookRoutes from "./routes/bookRoutes.js";
import FavouriteRoutes from "./routes/favouriteRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());

//----Routes------
app.use("/api/user", UserRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/favourite", FavouriteRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);


// ---------- DB + Start ----------
mongoose
  .connect(process.env.URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
