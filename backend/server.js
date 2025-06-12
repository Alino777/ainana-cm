// backend/server.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mammoth = require('mammoth');
const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');

// 1. IMPORTIAMO L'SDK DI GOOGLE AI
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 2. INIZIALIZZA GEMINI CON LA TUA API KEY
// ====================================================================================
// !! IMPORTANTE !! Assicurati che qui ci sia la tua chiave API corretta.
// ====================================================================================
const genAI = new GoogleGenerativeAI("AIzaSyAxsD5sGuT3C1i6dfG1Yjgs1pijxt4hXys");


const app = express();
const port = 3001;
app.use(cors());
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)){ fs.mkdirSync(uploadsDir); }
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

async function extractTextFromFile(filePath, mimeType) {
  console.log(`Estrazione del testo dal file: ${filePath}`);
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else if (mimeType === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } else if (mimeType.startsWith('image/')) {
    console.log('Riconoscimento OCR in corso con Tesseract...');
    const result = await Tesseract.recognize(filePath, 'ita', { logger: m => console.log(m.status) });
    console.log('Riconoscimento OCR completato.');
    return result.data.text;
  } else if (mimeType === 'text/plain') {
    return fs.readFileSync(filePath, 'utf8');
  } else {
    throw new Error(`Formato file non supportato: ${mimeType}`);
  }
}

// 3. FUNZIONE PER CHIAMARE GEMINI AI
async function callGeminiAI(text) {
    console.log("Invio del testo a Gemini AI per l'analisi...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
        Sei un assistente nutrizionista AI altamente specializzato. Analizza il testo del piano alimentare fornito e strutturalo in un formato JSON preciso.
        Il JSON deve avere la seguente struttura:
        {
          "patientName": "Nome Cognome del paziente (se presente, altrimenti null)",
          "tags": ["Tag descrittivo 1 (es: Dieta Mediterranea)", "Tag descrittivo 2 (es: Approccio empatico)"],
          "nextVisit": "Data della prossima visita (se presente, altrimenti null)",
          "weeklyPlan": {
            "lunedi": { "colazione": [{"food": "Nome alimento", "quantity": "quantità"}], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "martedi": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "mercoledi": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "giovedi": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "venerdi": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "sabato": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] },
            "domenica": { "colazione": [], "merenda": [], "pranzo": [], "spuntino": [], "cena": [] }
          }
        }
        Estrai con la massima precisione possibile gli alimenti, le quantità (inclusa l'unità di misura come 'gr', 'ml', 'fette'), e suddividili correttamente nei pasti e nei giorni.
        Se un'informazione non è presente nel testo, imposta il valore a null o a un array vuoto [].
        Restituisci ESCLUSIVAMENTE l'oggetto JSON, senza testo aggiuntivo o formattazione come \`\`\`json.

        Ecco il testo da analizzare:
        ---
        ${text}
        ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jsonText = response.text();
    
    // ===================================================================
    // CORREZIONE PER PULIRE LA RISPOSTA DELL'AI
    // ===================================================================
    const cleanJsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJsonText);
}

// 4. ENDPOINT FINALE
app.post('/api/process-diet', upload.single('dietFile'), async (req, res) => {
  if (!req.file) return res.status(400).send('Nessun file caricato.');
  
  console.log('File ricevuto:', req.file.filename);

  try {
    const extractedText = await extractTextFromFile(req.file.path, req.file.mimetype);
    console.log("Testo estratto con successo.");

    const structuredData = await callGeminiAI(extractedText);
    console.log("✅ Dati strutturati ricevuti da Gemini:", structuredData);

    res.status(200).json(structuredData);

  } catch (error) {
    console.error("❌ Errore nel processo principale:", error);
    res.status(500).json({ message: "Errore durante l'elaborazione del file.", error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server backend in ascolto su http://localhost:${port}`);
});
