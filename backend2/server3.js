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

  // Construct a prompt to generate the diet plan for each day of the week
  const prompt = `
    Create a structured diet plan for a week (Monday to Sunday) based on the following menu and user information:
    - User data: ${JSON.stringify(userData)}
    - Menu items: ${menuText}
    - Structure the plan for each day of the week, with:
      - Meal times: Breakfast, Lunch, Snacks, Dinner
      - Food items for each meal (name and quantity)
      - Preparation instructions for each food item
      - Ensure that there are 4-5 meals per day (including snacks)
      - Each day's plan should be balanced, vegetarian, and aligned with the user's dietary preferences.
      
    Format the diet plan in JSON with the following structure:
    {
      "Monday": {
        "Breakfast": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
        "Lunch": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
        "Snacks": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }],
        "Dinner": [{ "food": "item name", "quantity": "amount", "instructions": "how to prepare" }]
      },
      "Tuesday": { ... },
      "Wednesday": { ... },
      "Thursday": { ... },
      "Friday": { ... },
      "Saturday": { ... },
      "Sunday": { ... }
    }
  `;

  // Generate content using the AI model
  const result = await model.generateContent(prompt);
  const response = await result.response;

  // Log the raw response for debugging
  const rawResponse = response.text(); // Get the raw text response from AI model
  console.log('Raw response:', rawResponse); // Log to console for debugging

  // Clean up the response by removing unwanted markdown or code blocks
  const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();

  try {
    // Parse the cleaned response into a valid JSON object
    const dietPlan = JSON.parse(cleanedResponse);
    return dietPlan;
  } catch (error) {
    console.error('Error parsing the response:', error);
    throw new Error('Failed to parse the diet plan response');
  }
}

app.post('/generate-plan', upload.single('hostelMenu'), async (req, res) => {
  try {
    const userData = req.body;
    const menuText = await processFile(req.file); // Extract the menu text from the uploaded file
    
    // Generate a structured diet plan for the entire week (Monday to Sunday)
    const dietPlan = await generateDietPlan(userData, menuText);

    res.json(dietPlan); // Return the generated diet plan as JSON
  } catch (error) {
    console.error('Error during diet plan generation:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
