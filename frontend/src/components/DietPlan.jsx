import React from 'react';
import { useLocation } from 'react-router-dom';
import './DietPlan.css';

const DietPlan = () => {
  const location = useLocation();
  const dietPlan = location.state?.dietPlan;

  if (!dietPlan) {
    return <div>No diet plan available.</div>;
  }

  return (
    <div className="diet-plan-container">
      <h2>Your Diet Plan</h2>
      <table className="diet-plan-table">
        <thead>
          <tr>
            <th>Meal</th>
            <th>Food</th>
            <th>Quantity</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(dietPlan).map(([meal, items]) => (
            items.map((item, index) => (
              <tr key={`${meal}-${index}`}>
                <td>{meal}</td>
                <td>{item.food}</td>
                <td>{item.quantity}</td>
                <td>{item.instructions}</td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DietPlan;