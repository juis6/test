import express, { Application } from "express";
import cors from "cors";
import flagRoutes from "./routes/FlagRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", flagRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Flag Post API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
