import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './FindMeditationCenter.css';
import SkeletonCard from './SkleletonCard';

const FindMeditationCenter = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const zipcode = searchParams.get('zipcode');
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/meditation-centers?zipcode=${zipcode}`);
        const data = await response.json();
        setCenters(data);
      } catch (error) {
        console.error('Error fetching meditation centers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, [zipcode]);

  return (
    <div className="meditation-centers-container">
      <br />
      <h1>Meditation Centers Near {zipcode}</h1>
      <br />
      <br />
      <div className="centers-grid">
        {loading ? (
          // Display skeleton loaders while data is being fetched
          Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
        ) : (
            centers.map(center => (
                <div key={center.name} className="center-card">
                  <h2>{center.name}</h2>
                  <p>{center.address}</p>
                  <p>{center.zipcode}</p>
                  <div className="center-actions">
                    <a href={center.mapLink} target="_blank" rel="noopener noreferrer">
                      View on Map
                    </a>
                    <button onClick={() => alert('Chat feature coming soon!')}>Chat</button>
                  </div>
                </div>
             ))
            )}
          </div>
        </div>
    );
};


export default FindMeditationCenter;