// src/pages/Home.jsx
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import '../GameSite/css/styles.css';

function Home() {
  const location = useLocation();

  // When navigated to "/#work", scroll to the section smoothly
  useEffect(() => {
    if (location.hash === '#work') {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <main>
      {/* Anchor target just below the hero */}
      <section id="work" className="featured-projects">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <img src="/images/project1.jpg" alt="Project 1" />
            <h3>Super Dragon Vanguard</h3>
            <p>An immersive on-rails shooter game. Choose your paths and explore!</p>
            <Link to="/games" className="btn">Learn More</Link>
          </div>
          <div className="project-card">
            <img src="/images/project2.jpg" alt="Project 2" />
            <h3>Video Game Data Visualizer</h3>
            <p>A web app for analyzing and recommending video games.</p>
            <Link to="/projects" className="btn">View Project</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
