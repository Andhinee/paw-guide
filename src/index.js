import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // <--- WAJIB IMPORT INI
import animalRoutes from "./routes/animalRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// --- PERBAIKAN UTAMA UNTUK VERCEL ---
// 1. Set static folder menggunakan path absolute (process.cwd())
// Ini memberitahu Vercel lokasi tepat folder 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// 2. Route API (Biarkan seperti ini)
app.use("/api", animalRoutes);

// 3. Fallback Route: Jika user membuka halaman utama ('/'), 
// paksa kirim file index.html secara manual.
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;