import React from 'react';
import { useLocation } from 'react-router-dom';

const FindMeditationCenter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const zipcode = searchParams.get('zipcode');

  return (
    <div>
      <h1>Find Meditation Center</h1>
      <p>Searching for meditation centers near: {zipcode}</p>
      {/* Add your logic to display meditation centers based on the zipcode */}
    </div>
  );
};

export default FindMeditationCenter;