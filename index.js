import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
app.use(cors());
// app.use(express.json());

app.get('/aladin', async (req, res) => {
  try {
    const params = new URLSearchParams(req.query);
    console.debug('params', params);

    const response = await fetch(`${process.env.VITE_ALADIN_URL}${process.env.VITE_ALADIN_BOOKLIST_PATH}?ttbkey=${process.env.VITE_ALADIN_TTBKEY}&QueryType=ItemNewAll&${params.toString()}&output=js&Version=20131101`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Aladin API" });
  }
});

app.get('/ping', (req, res) => {
  res.status(200).send('OK');
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});