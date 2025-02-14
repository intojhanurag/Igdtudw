import { useEffect, useRef, useState } from 'react';
import Sage from '../images/Sage.png';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const carouselRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleImageClick = () => {
        navigate('/chatbox');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/find-meditation-center?zipcode=${searchQuery}`);
    };

    useEffect(() => {
        const carousel = carouselRef.current;

        const handleMouseEnter = () => {
            carousel.style.animationPlayState = 'paused';
        };

        const handleMouseLeave = () => {
            carousel.style.animationPlayState = 'running';
        };

        carousel.addEventListener('mouseenter', handleMouseEnter);
        carousel.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            carousel.removeEventListener('mouseenter', handleMouseEnter);
            carousel.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div className="home-container">
            <div className="home-content">
                <div className="image-container">
                    <img 
                        src={Sage} 
                        alt="Sage-Career mentor bot" 
                        className="home-logo"
                        onClick={handleImageClick}
                    />
                    <div className="speech-bubble">Hello! I'm Trimly. How can I help?</div>
                </div>
                <div className="search-container">
                
                    <form onSubmit={handleSearch} className='search-form'>
                        <input
                            type="text"
                            placeholder="Enter PinCode"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            required
                            className='search-input'
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>
                <div className="text-container">
                    <h1 style={{fontFamily:"serif"}}>Calore</h1>
                    <div className="info-section">
                        <h2>About Trimly</h2>
                        <p>
                        Trimly is your AI-powered dieting coach, designed to guide you through your health and fitness journey.
                        Whether you're looking to lose weight, build muscle, or maintain a balanced diet, Trimly provides personalized 
                        nutrition advice and structured meal roadmaps tailored to your goals.
                        </p>
                        <br />

                        <h2>How to Use Calore</h2>
                        <div className="card-carousel" ref={carouselRef}>
                            {[...Array(2)].map(() => ( // Duplicate the cards
                                <>
                                    <div className="card">
                                        <h3>Create Your Profile</h3>
                                        <p>Start by visiting the User Input page to tell us about your dietary preferences, fitness goals, and daily routine.</p>
                                    </div>
                                    <div className="card">
                                        <h3>Explore Diet Roadmaps</h3>
                                        <p>Check out the NutriMap page for structured, step-by-step meal plans tailored to your health objectives.</p>
                                    </div>
                                    <div className="card">
                                        <h3>Chat with Trimly</h3>
                                        <p>Get help with meal planning, nutrition tracking, and fitness guidance.</p>
                                    </div>
                                </>
                            ))}
                        </div>

                        <h2>Features</h2>
                        <div className="card-carousel" ref={carouselRef}>
                            <div className="card">
                                <h3>Personalized Diet Plans</h3>
                                <p>Get diet plans tailored to your specific needs and goals.</p>
                            </div>
                            <div className="card">
                                <h3>Interactive Nutrition Roadmaps</h3>
                                <p>Follow structured meal plans with detailed nutrition insights.</p>
                            </div>
                            <div className="card">
                                <h3>Real-Time Chat Assistance</h3>
                                <p>Chat with Trimly for instant advice and support.</p>
                            </div>
                            <div className="card">
                                <h3>Comprehensive Food Insights</h3>
                                <p>Learn about the nutritional value of different foods.</p>
                            </div>
                            <div className="card">
                                <h3>Progress Tracking</h3>
                                <p>Track your progress and stay motivated.</p>
                            </div>

                            <div className="card">
                                <h3>Personalized Diet Plans</h3>
                                <p>Get diet plans tailored to your specific needs and goals.</p>
                            </div>
                            <div className="card">
                                <h3>Interactive Nutrition Roadmaps</h3>
                                <p>Follow structured meal plans with detailed nutrition insights.</p>
                            </div>
                            <div className="card">
                                <h3>Real-Time Chat Assistance</h3>
                                <p>Chat with Trimly for instant advice and support.</p>
                            </div>
                            <div className="card">
                                <h3>Comprehensive Food Insights</h3>
                                <p>Learn about the nutritional value of different foods.</p>
                            </div>
                            <div className="card">
                                <h3>Progress Tracking</h3>
                                <p>Track your progress and stay motivated.</p>
                            </div>
                        </div>

                        <p className="get-started">
                            Ready to begin? Click on Trimly or head to the User Input page to start your journey!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;