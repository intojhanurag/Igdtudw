import { Routes, Route, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Home from './components/Home'
import Header from './components/Header'
import UserInput from './components/UserInput'
import Roadmap from './components/Roadmap'
import Chatbox from './components/chatbox'
import Login from './components/Login';
import Articles from './components/Articles'; // Import the Articles component
import DietPlan from './components/DietPlan';
import FindMeditationCenter from './components/FindMeditationCenter';


import Signup from './components/signup';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';
import Footer from './components/Footer';
import './App.css'
import './styles/themes.css'

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'light' ? 'light-theme' : ''}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userinput" element={<ProtectedRoute><UserInput /></ProtectedRoute>} /> {/* Protect UserInput route */}
        <Route 
          path="/roadmap" 
          element={
            <RoadmapWrapper />
          } 
        />
        <Route path="/chatbox" element={<Chatbox />} />
        <Route path="/login" element={<Login />} /> {/* Add the Login route */}
        <Route path="/signup" element={<Signup />} /> {/* Add the Signup route */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> {/* Protect Profile route */}
        <Route path="/find-meditation-center" element={<FindMeditationCenter />} /> {/* Add the FindMeditationCenter route */}
        <Route path="/articles" element={<Articles />} /> {/* Add the Articles route */}
        <Route path="/diet-plan" element={<DietPlan />} /> {/* Add the DietPlan route */}

      </Routes>
      <Footer/>
    </div>
  );
}

// Create a wrapper component to handle the URL parameters
function RoadmapWrapper() {
  const [searchParams] = useSearchParams();
  let type = searchParams.get('type');
  
  if (type === 'coming-soon') {
    return (
      <div className="roadmap-container">
        <h2>Your dieting assistent is coming soon!</h2>
        <p>We're working on creating more dieting path. Check back later!</p>
      </div>
    );
  }

  return <Roadmap type={type || 'dieting'} />;
}

export default App;