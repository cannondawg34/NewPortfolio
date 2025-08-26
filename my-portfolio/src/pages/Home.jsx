import { Link } from 'react-router-dom';
import '../GameSite/css/styles.css';

function Home() {
  return (
    <main>
      <section className="featured-projects">
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