import Sage from '../images/Sage.png'
import './Home.css'
import { useNavigate } from 'react-router-dom'

function Home(){
    const navigate = useNavigate();

    const handleImageClick = () => {
        navigate('/chatbox');
    };

    return(
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
                        <ol className="steps-list">
                            <li>
                                <strong>Create Your Profile:</strong> Start by visiting the User Input page to tell us about 
                                your dietary preferences, fitness goals, and daily routine.
                            </li>
                            <li>
                                <strong>Explore Diet Roadmaps:</strong>  Check out the NutriMap page for structured, 
                                step-by-step meal plans tailored to your health objectives, complete with nutrition insights
                                and recommended food choices.
                            </li>
                            <li>
                                <strong>Chat with Trimly:</strong> Have questions? Click on Trimly's image or the Chat with Sage 
                                option to start a conversation. Trimly can help with:
                                <ul>
                                    <li>Personalized meal planning</li>
                                    <li>Calorie and nutrition tracking</li>
                                    <li>Fitness and lifestyle guidance</li>
                                    <li>Healthy eating habits and food recommendations</li>
                                </ul>
                            </li>
                        </ol>

                        <h2>Features</h2>
                        <ul className="features-list">
                            <li>Personalized Diet Plans</li>
                            <li>Interactive Nutrition Roadmaps </li>
                            <li>Real-Time Chat Assistance </li>
                            <li>Comprehensive Food Insights </li>
                            <li>Progress tracking</li>
                        </ul>

                        <p className="get-started">
                            Ready to begin? Click on Trimly or head to the User Input page to start your journey!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home