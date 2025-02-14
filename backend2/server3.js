// filepath: /c:/Users/aojha/OneDrive/Desktop/Cohort 3.0 Web Dev/Iddtuw/backend2/server3.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdfParse = require('pdf-parse');
const tesseract = require('tesseract.js');
const authRoutes = require('./routes/auth');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Connect to MongoDB
mongoose.connect('mongodb+srv://aojharaj2004:arpitojha%40com@cluster0.qhh6b.mongodb.net/Calore')
.then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Use auth routes
app.use('/api/auth', authRoutes);

// Extract text from PDF or image file
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

// Function to generate a diet plan based on extracted menu and user data
async function generateDietPlan(userData, menuText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Create a structured diet plan based on the following menu and user information:
    - User data: ${JSON.stringify(userData)}
    - Menu items: ${menuText}
    - Structure the plan from morning to night, with:
      - Meal times (Breakfast, Lunch, Snacks, Dinner)
      - Food items for each meal
      - Quantity and preparation instructions for each food item
      - 4-5 meals per day
      - Ensure the plan is vegetarian and balanced.

    Format the diet plan in JSON with the following structure:
    {
      "Breakfast": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
      "Lunch": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
      "Snacks": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
      "Dinner": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }]
    }
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  const rawResponse = response.text();
  console.log('Raw response:', rawResponse); 
  
  const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();

  try {
    const dietPlan = JSON.parse(cleanedResponse);
    return dietPlan;
  } catch (error) {
    console.error('Error parsing the response:', error);
    throw new Error('Failed to parse the diet plan response');
  }
}

app.post('/api/sage/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `User message: ${message}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    res.json({ response: response.text() });
  } catch (error) {
    console.error('Error interacting with Gemini:', error);
    res.status(500).json({ error: 'Failed to get response from Gemini.' });
  }
});

app.post('/generate-plan', upload.single('hostelMenu'), async (req, res) => {
  try {
    const userData = req.body;
    const menuText = req.file ? await processFile(req.file) : '';

    const dietPlan = await generateDietPlan(userData, menuText);

    res.json(dietPlan);
  } catch (error) {
    console.error('Error during diet plan generation:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/meditation-centers', async (req, res) => {
  const { zipcode } = req.query;

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Provide a list of 5-6 meditation centers near the pincode ${zipcode}. 
    Include the name, address, pincode, latitude, longitude, and a link to view on Google Maps for each center.
    Format the response in JSON with the following structure:
    [
      {
        "name": "Center Name",
        "address": "Center Address",
        "zipcode": "Center Pincode",
        "latitude": "Center Latitude",
        "longitude": "Center Longitude",
        "mapLink": "Google Maps Link"
      },
      ...
    ]
  `;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawResponse = response.text();

    console.log('Raw response:', rawResponse); 

    let centers;

    try {
      centers = JSON.parse(rawResponse.replace(/```json|```/g, '').trim());
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return res.status(500).json({ error: 'Invalid JSON response from Gemini.' });
    }
    
    // const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();
    // const centers = JSON.parse(cleanedResponse);
    
    res.json(centers);
  } catch (error) {
    console.error('Error fetching meditation centers:', error);
    res.status(500).json({ error: 'Failed to fetch meditation centers.' });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));