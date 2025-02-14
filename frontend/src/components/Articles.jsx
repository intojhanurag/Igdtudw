import React from 'react';
import './Articles.css';

const articles = [
  {
    id: 1,
    title: 'Meditation for Beginners',
    image: './photos/image1.jpg',
    link: '/article/1',
  },
  {
    id: 2,
    title: 'Advanced Meditation Techniques',
    image: './photos/image2.jpg',
    link: '/article/2',
  },
  {
    id: 3,
    title: 'Mindfulness in Daily Life',
    image: './photos/image3.jpg',
    link: '/article/3',
  },
  {
    id: 4,
    title: 'The Benefits of Meditation',
    image: './photos/image4.jpg',
    link: '/article/4',
  },
  {
    id: 5,
    title: 'Meditation and Mental Health',
    image: './photos/image5.jpg',
    link: '/article/5',
  },
  {
    id: 6,
    title: 'Guided Meditation Practices',
    image: './photos/image6.jpg',
    link: '/article/6',
  },
  {
    id: 7,
    title: 'Meditation for Stress Relief',
    image: './photos/image7.jpg',
    link: '/article/7',
  },
  {
    id: 8,
    title: 'Meditation and Sleep',
    image: './photos/image8.jpg',
    link: '/article/8',
  },
  {
    id: 9,
    title: 'Meditation for Focus and Clarity',
    image: './photos/image9.jpg',
    link: '/article/9',
  },
  {
    id: 10,
    title: 'Meditation and Yoga',
    image: './photos/image10.jpg',
    link: '/article/10',
  },
  {
    id: 11,
    title: 'Meditation for Anxiety',
    image: './photos/image11.jpg',
    link: '/article/11',
  },
  {
    id: 12,
    title: 'Meditation and Mindfulness',
    image: './photos/image12.jpg',
    link: '/article/12',
  },
];

const Articles = () => {
  return (
    <div className="articles-container">
      <h1>Articles</h1>
    
      <p>Read and upload articles related to meditation and wellness.</p>
      <div className="articles-grid">
        {articles.map(article => (
          <div key={article.id} className="article-card">
            <a href={article.link}>
              <img src={article.image} alt={article.title} className="article-image" />
              <div className="article-overlay">
                <h2>{article.title}</h2>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;