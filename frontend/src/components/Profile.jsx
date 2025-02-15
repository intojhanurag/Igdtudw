import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading,setIsLoading]=useState(true);
  const [error,setError]=useState(null);
  const navigate = useNavigate();
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://igdtudw.onrender.com/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          navigate('/login');
        }
      } catch (error) {
        setError('Error fetching user. Please try again.');
        navigate('/login');
      } finally{
        setIsLoading(false);
      }
     
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const card = cardRef.current;
      if (!card) return;
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      const rotateX = (y - 0.5) * 20;
      const rotateY = (x - 0.5) * -20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      const card = cardRef.current;
      if (!card) return;
      card.style.transform = 'rotateX(0) rotateY(0)';
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);
  const handleCloseAlert=()=>{
    setError(null);
  }
  if(isLoading){
    return <LoadingSpinner/>
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      {error && <Alert message={error} onClose={handleCloseAlert}/>}
      <div className="profile-card" ref={cardRef}>
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="/photos/Avatar.jpg" alt="Profile Avatar" />
          </div>
          <h2>{user.name}</h2>
        </div>
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;