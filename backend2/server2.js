// require('dotenv').config();
// const express = require('express');
// const multer = require('multer');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const pdfParse = require('pdf-parse');
// const tesseract = require('tesseract.js');
// const cors = require('cors');

// const app = express();
// const upload = multer({ storage: multer.memoryStorage() });
// app.use(cors());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Extract text from PDF or image file
// async function processFile(file) {
//   if (file.mimetype === 'application/pdf') {
//     const data = await pdfParse(file.buffer);
//     return data.text;
//   } else if (file.mimetype.startsWith('image/')) {
//     const { data: { text } } = await tesseract.recognize(file.buffer);
//     return text;
//   }
//   throw new Error('Unsupported file type');
// }

// // Function to generate a diet plan based on extracted menu and user data
// async function generateDietPlan(userData, menuText) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   // Construct a prompt to generate the diet plan
//   const prompt = `
//     Create a structured diet plan based on the following menu and user information:
//     - User data: ${JSON.stringify(userData)}
//     - Menu items: ${menuText}
//     - Structure the plan from morning to night, with:
//       - Meal times (Breakfast, Lunch, Snacks, Dinner)
//       - Food items for each meal
//       - Quantity and preparation instructions for each food item
//       - 4-5 meals per day
//       - Ensure the plan is vegetarian and balanced.

//     Format the diet plan in JSON with the following structure:
//     {
//       "Breakfast": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
//       "Lunch": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
//       "Snacks": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
//       "Dinner": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }]
//     }
//   `;

//   // Generate content using the AI model
//   const result = await model.generateContent(prompt);
//   const response = await result.response;
  
//   // Log the raw response text to help with debugging
//   const rawResponse = response.text(); // Get the raw text response from AI model
//   console.log('Raw response:', rawResponse); // Log to console for debugging
  
//   // Clean up the response by removing unwanted markdown or code blocks
//   const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();

//   try {
//     // Parse the cleaned response into a valid JSON object
//     const dietPlan = JSON.parse(cleanedResponse);
//     return dietPlan;
//   } catch (error) {
//     console.error('Error parsing the response:', error);
//     throw new Error('Failed to parse the diet plan response');
//   }
// }


// app.post('/api/sage/chat', async (req, res) => {
//     const { message } = req.body;
  
//     if (!message) {
//       return res.status(400).json({ error: 'Message is required.' });
//     }
  
//     try {
//       // Use the Gemini API to get a response for the user's message
//       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
//       const prompt = `User message: ${message}`;
      
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
      
//       res.json({ response: response.text() }); // Send back Gemini's response
//     } catch (error) {
//       console.error('Error interacting with Gemini:', error);
//       res.status(500).json({ error: 'Failed to get response from Gemini.' });
//     }
//   });

// app.post('/generate-plan', upload.single('hostelMenu'), async (req, res) => {
//   try {
//     const userData = req.body;
//     const menuText = await processFile(req.file); // Extract the menu text from the uploaded file
    
//     // Generate a structured diet plan using AI
//     const dietPlan = await generateDietPlan(userData, menuText);

//     res.json(dietPlan); // Return the generated diet plan as JSON
//   } catch (error) {
//     console.error('Error during diet plan generation:', error.message);
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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

// Use express.json() middleware to parse JSON bodies
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    const menuText = await processFile(req.file); 

    const dietPlan = await generateDietPlan(userData, menuText);

    res.json(dietPlan);
  } catch (error) {
    console.error('Error during diet plan generation:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
