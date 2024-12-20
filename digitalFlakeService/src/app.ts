import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes";
import categoryRoutes from "./routes/category.routes";
import subcategoryRoutes from "./routes/subcategory.routes";
import productsRoutes from "./routes/product.routes";
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

// Routes
app.use("/auth", authRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/products", productsRoutes);

export default app;
