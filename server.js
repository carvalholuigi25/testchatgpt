import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages,
    });

    res.json(completion.choices[0].message);

    // const completion = await openai.responses.create({
    //   model: "gpt-5.2",
    //   input: messages
    // });

    // res.json(completion.output_text);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar resposta " + error });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
