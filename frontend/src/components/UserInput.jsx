import React, { useState } from 'react'
import './PageStyles.css'
import './UserInput.css'
import { useNavigate } from 'react-router-dom';
import Roadmap from './Roadmap';
import spinningCatVideo from '../images/nethenoob vid.mp4';

function UserInput() {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Log the collected data
    console.log('User Profile Data:', userData);

    // Send data to backend
    fetch('https://igdtudw.onrender.com/userinput', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Profile submitted successfully!');
      
      // Show video
      setShowVideo(true);
      
      // Navigate after delay
      setTimeout(() => {
        if (selectedInterest) {
          const path = selectedInterest === 'other' ? '/roadmap?type=coming-soon' : `/roadmap?type=${selectedInterest}`;
          navigate(path);
        }
      }, 3000);
      
      // Clear the form
      e.target.reset();
      setSelectedInterest('');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Error submitting profile. Please try again.');
    });
    // Navigate after delay
    setTimeout(() => {
      if (selectedInterest) {
        // Navigate to "coming soon" for "other", regular roadmap for specific interests
        const path = selectedInterest === 'other' ? '/roadmap?type=coming-soon' : `/roadmap?type=${selectedInterest}`;
        navigate(path);
      }
    }, 3000);
    
    // You can add API call here later to send data to backend
    alert('Profile submitted successfully!');

    if (selectedInterest && selectedInterest !== 'other') {
      setShowRoadmap(true);
      // Navigate to roadmap page with the selected interest
      navigate(`/roadmap?type=${selectedInterest}`);
    }
    
    // Optionally clear the form
    e.target.reset();
    setSelectedInterest(''); // Reset the interest selection state
  };

  const handleSpinningCatClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="user-input-container">
      <h2 className="profile-heading">DIETING PROFILE</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-section">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label htmlFor="height">Height</label>
            <input type="number" id="height" name="height" min="50" max="250" required />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight</label>
            <input type="number" id="weight" name="weight" min="30" max="300" required />
          </div>

          <div className="form-group">
            <label htmlFor="healthConditions">Health Concerns</label>
            <textarea id="healthConditions" name="healthConditions" placeholder="Any allergies, health conditions, etc." rows="3"></textarea>
          </div>
        </div>

        <div className="form-section">
          <h3>Dietary Preferences</h3>

          <div className="form-group">
            <label htmlFor="dietRestrictions">Dietary Restrictions</label>
            <select id="dietRestrictions" name="dietRestrictions" required>
                <option value="">Select dietary restriction</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="keto">Keto</option>
                <option value="glutenFree">Gluten-Free</option>
                <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="goal">Diet Goal</label>
            <select id="goal" name="goal" required>
                <option value="">Select your goal</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="muscleGain">Muscle Gain</option>
                <option value="generalHealth">General Health</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Exercise & food Preferences</h3>
          <div className="form-group">
            <label htmlFor="exerciseHabits">Exercise Habits</label>
            <textarea id="exerciseHabits" name="exerciseHabits" placeholder="What exercises do you do (e.g., gym, yoga)?" rows="3"></textarea>
          </div>
        </div>

        <div className="form-section">
         <h3>Hostel Menu Upload</h3>
         <div className="form-group">
            <label htmlFor="hostelMenu">Upload Hostel Menu (PDF or Image)</label>
            <input 
            type="file" 
            id="hostelMenu" 
            name="hostelMenu" 
            accept=".pdf, .jpg, .jpeg, .png" 
            required
            />
         </div>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <button onClick={handleSpinningCatClick} className="spinning-cat-btn">
        Spinning Cat
      </button>

      {showVideo && (
        <div className="video-modal-overlay">
          <div className="video-modal">
            <button className="close-button" onClick={() => setShowVideo(false)}>×</button>
            <video autoPlay muted>
              <source src={spinningCatVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {showRoadmap && selectedInterest && selectedInterest !== 'other' && (
        <Roadmap type={selectedInterest} />
      )}
    </div>
  );
}

export default UserInput;