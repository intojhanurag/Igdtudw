import React, { useState } from 'react';
import './PageStyles.css';
import './UserInput.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

function UserInput() {
  const [selectedInterest, setSelectedInterest] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get form data
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Log the collected data
    console.log('User Profile Data:', userData);
    
    try {
      const response = await fetch('https://igdtudw.onrender.com/generate-plan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Success:', data);
      navigate('/diet-plan', { state: { dietPlan: data } });
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpinningCatClick = () => {
    setShowVideo(true);
  };

  return (
    <div className="user-input-container">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
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
              <h3>Exercise & Food Preferences</h3>
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
                <video autoPlay>
                  <source src="/Cat Vibing.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserInput;