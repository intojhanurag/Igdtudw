import React from 'react';
import './Articles.css';

const articles = [
  {
    id: 1,
    title: 'Meditation for Beginners',
    image: './photos/image1.jpg',
    link: 'https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858',
  },
  {
    id: 2,
    title: 'Advanced Meditation Techniques',
    image: './photos/image2.jpg',
    link: 'https://news.harvard.edu/gazette/story/2018/04/harvard-researchers-study-how-mindfulness-may-change-the-brain-in-depressed-patients/',
  },
  {
    id: 3,
    title: 'Mindfulness in Daily Life',
    image: './photos/image3.jpg',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10355843/',
  },
  {
    id: 4,
    title: 'The Benefits of Meditation',
    image: './photos/image4.jpg',
    link: 'https://www.nytimes.com/article/how-to-meditate.html',
  },
  {
    id: 5,
    title: 'Meditation and Mental Health',
    image: './photos/image5.jpg',
    link: 'https://edition.cnn.com/2022/06/13/health/meditation-science-wellness/index.html',
  },
  {
    id: 6,
    title: 'Guided Meditation Practices',
    image: './photos/image6.jpg',
    link: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4895748/',
  },
  {
    id: 7,
    title: 'Meditation for Stress Relief',
    image: './photos/image7.jpg',
    link: 'https://www.apa.org/topics/mindfulness/meditation',
  },
  {
    id: 8,
    title: 'Meditation and Sleep',
    image: './photos/image8.jpg',
    link: 'https://kids.britannica.com/students/article/meditation/631654',
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
    link: 'https://sps.columbia.edu/news/how-meditation-can-help-you-focus',
  },
  {
    id: 11,
    title: 'Meditation for Anxiety',
    image: './photos/image11.jpg',
    link: 'https://amala.earth/blogs/amala-earth-blog/advantages-of-meditation-for-students?srsltid=AfmBOoppTj6UGrPEyndCZHNulyWJ30-c1OrCBzgiKtABnsay1eaM5bhp',
  },
  {
    id: 12,
    title: 'Meditation and Mindfulness',
    image: './photos/image12.jpg',
    link: 'https://my.clevelandclinic.org/health/articles/17906-meditation',
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