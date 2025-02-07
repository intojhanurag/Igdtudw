import React from 'react'
import PropTypes from 'prop-types';
import './Roadmap.css'

const Roadmap = ({ type }) => {
  const roadmapData = {
    dieting: [
        { 
          text: "Understand Basic Nutrition Principles", 
          link: "https://www.eatright.org/health/essential-nutrients" 
        },
        { 
          text: "Learn About Macronutrients (Proteins, Carbs, Fats)", 
          link: "https://www.healthline.com/nutrition/what-are-macronutrients" 
        }, 
        { 
          text: "Discover Micronutrients (Vitamins & Minerals)", 
          link: "https://www.hsph.harvard.edu/nutritionsource/vitamins/" 
        },
        { 
          text: "Learn About Different Diet Types (Keto, Paleo, Vegan)", 
          link: "https://www.medicalnewstoday.com/articles/diets" 
        },
        { 
          text: "Understand Calorie Counting & Portion Control", 
          link: "https://www.healthline.com/nutrition/portion-control" 
        },
        { 
          text: "Learn Meal Planning & Prep Strategies", 
          link: "https://www.eatingwell.com/article/290855/meal-prep-for-beginners/" 
        },
        { 
          text: "Discover Healthy Cooking Techniques", 
          link: "https://www.heart.org/en/healthy-living/healthy-eating/cooking-skills" 
        },
        { 
          text: "Understand Supplementation Basics", 
          link: "https://ods.od.nih.gov/HealthInformation/dietary_recommendations.aspx" 
        },
        { 
          text: "Learn About Gut Health & Digestion", 
          link: "https://www.health.harvard.edu/topics/digestive-health" 
        },
        { 
          text: "Track Your Meals (MyFitnessPal Tutorial)", 
          link: "https://www.youtube.com/watch?v=QhBXlEbYmYQ" 
        },
        { 
          text: "Understand Emotional Eating Patterns", 
          link: "https://www.helpguide.org/articles/diets/emotional-eating.htm" 
        },
        { 
          text: "Learn Exercise-Nutrition Synergy", 
          link: "https://www.acsm.org/docs/default-source/files-for-resource-library/exercise-nutrition.pdf" 
        },
        { 
          text: "Discover Healthy Snack Alternatives", 
          link: "https://www.eatthis.com/healthy-snacks/" 
        },
        { 
          text: "Understand Food Label Reading", 
          link: "https://www.fda.gov/food/new-nutrition-facts-label/how-understand-and-use-nutrition-facts-label" 
        },
        { 
          text: "Learn Hydration Fundamentals", 
          link: "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/water/art-20044256" 
        },
        { 
          text: "Maintain Progress with Food Journaling", 
          link: "https://www.healthline.com/nutrition/food-journal" 
        },
        { 
          text: "Join Dieting Communities (Reddit/Facebook Groups)", 
          link: "https://www.reddit.com/r/nutrition/" 
        }
      ],
  };

  const getRoadmapContent = () => {
    const steps = roadmapData[type];
    if (!steps) return <div>Invalid roadmap type</div>;

    const titles = {
      data: "Data Analytics Roadmap",
      dieting: "Dieting Roadmap",
      uiux: "UI/UX Design Roadmap",
      project: "Project Management Roadmap"
    };

    return (
      <div className="roadmap-section">
        <h3>{titles[type]}</h3>
        <div className="cards-container">
          {steps.map((step, index) => (
            <div key={index} className="card roadmap-step">
              <div className="step-number">{index + 1}</div>
              <div className="step-content">
                <a 
                  href={step.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="step-link"
                >
                  {step.text}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="roadmap-container">
      {getRoadmapContent()}
    </div>
  );
};

Roadmap.propTypes = {
};

export default Roadmap;