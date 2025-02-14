import React from 'react';
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h3>Meditation Services</h3>
        <ul>
          <li>Emergency Calmdown</li>
          <li>Guided Sessions</li>
          <li>Expert Mentors</li>
          <li>Progress Analytics</li>
          <li>Mood Reports</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>User Resources</h3>
        <ul>
          <li>Dashboard</li>
          <li>Find a Mentor</li>
          <li>Session History</li>
          <li>Subscription Plans</li>
          <li>Mindfulness Courses</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Contact & Support</h3>
        <ul>
          <li>Virtual Office: Zen Valley, MV 12345</li>
          <li>Support: 1-800-MEDITATE</li>
          <li>Email: support@meditaker.com</li>
          <li>Availability: 24/7 AI Chatbot Support</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;