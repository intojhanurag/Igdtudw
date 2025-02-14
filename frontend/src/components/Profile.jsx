import React from 'react';
import './profile.css';

const Profile = () => {
  const username = localStorage.getItem('username'); // Get the username from local storage

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <p>Username: {username}</p>
      </div>
    </div>
  );
};

export default Profile;