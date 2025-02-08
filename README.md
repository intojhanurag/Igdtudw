Hostel Menu Diet Planner

Overview

Hostel Menu Diet Planner is a web-based platform designed to help hostel residents plan their diets effectively. It utilizes the Gemini API for AI-powered diet suggestions. The platform features a user-friendly interface built with React for the frontend and Node.js with Express for the backend.

Features

User Input Section: Users can input their hostel menu, dietary preferences, and health goals.

Roadmap Section: Provides a personalized dieting plan based on user input.

Chat with Trimly: AI-powered chatbot that offers dietary suggestions and answers related queries.

Tech Stack

Frontend: React.js (Vite for build optimization)

Backend: Node.js, Express.js

API: Gemini API for AI-based diet recommendations

Deployment: Vercel (Frontend), Render (Backend)

Installation & Setup

Prerequisites

Ensure you have the following installed on your system:

Node.js & npm

Git

Clone the Repository

git clone https://github.com/your-username/hostel-menu-diet.git
cd hostel-menu-diet

Backend Setup

Navigate to the backend directory:

cd backend

Install dependencies:

npm install

Create a .env file and add the required environment variables:

PORT=5000
GEMINI_API_KEY=your_api_key_here

Start the backend server:

npm start

Frontend Setup

Navigate to the frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the frontend server:

npm run dev

Deployment

Deploying Frontend (Vercel)

Push frontend code to GitHub.

Go to Vercel, import the repository, and set the root directory to frontend/.

Deploy the project.

Deploying Backend (Render)

Push backend code to GitHub.

Go to Render, create a new web service, and link the repository.

Set environment variables in the Render dashboard.

Deploy the backend.

Usage

Visit the deployed frontend URL.

Enter your hostel menu in the User Input section.

View personalized diet plans in the Roadmap section.

Chat with Trimly for AI-powered dietary advice.

Future Enhancements

Integration with a database for saving user preferences.

More advanced AI suggestions based on health conditions.

Mobile app version.

Contributing

Pull requests are welcome! If you have suggestions for improvements, feel free to open an issue.

License

This project is licensed under the MIT License.

Enjoy using Hostel Menu Diet Planner! 🚀
