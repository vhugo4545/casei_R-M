// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔗 Conexão direta com o MongoDB Atlas
mongoose.connect(
  "mongodb+srv://vitununesmoreira:Vhnm18842241@duli.8flnq.mongodb.net/proposta-db?retryWrites=true&w=majority&appName=Duli",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("✅ MongoDB conectado"))
.catch((err) => console.error("❌ Erro na conexão MongoDB:", err));

// Exemplo de schema para salvar imagens (base64 ou URL)
const FotoSchema = new mongoose.Schema({
  nome: String,
  dados: Buffer, // se quiser salvar binário
  mimetype: String,
  url: String     // se preferir salvar apenas a URL
});

const Foto = mongoose.model("Foto", FotoSchema);

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando 🚀");
});

// Rota para salvar foto em Base64
app.post("/fotos", async (req, res) => {
  try {
    const { nome, dados, mimetype, url } = req.body;
    const foto = new Foto({ nome, dados, mimetype, url });
    await foto.save();
    res.json({ ok: true, foto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar fotos
app.get("/fotos", async (req, res) => {
  const fotos = await Foto.find();
  res.json(fotos);
});

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🌐 Servidor rodando em http://localhost:${PORT}`));
