require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function processFile(file) {
  if (file.mimetype === 'application/pdf') {
    const data = await pdfParse(file.buffer);
    return data.text;
  } else if (file.mimetype.startsWith('image/')) {
    const { data: { text } } = await tesseract.recognize(file.buffer);
    return text;
  }
  throw new Error('Unsupported file type');
}

app.post('/generate-plan', upload.single('hostelMenu'), async (req, res) => {
  try {
    const userData = req.body;
    const menuText = await processFile(req.file);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Create a diet plan in JSON format with:
      - User data: ${JSON.stringify(userData)}
      - Menu items: ${menuText}
      - Structure: time, meal, items (food, quantity, instructions)
      - 4-5 meals per day`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/g, '');
    
    res.json(JSON.parse(text));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));