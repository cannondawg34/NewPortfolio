// src/components/Layout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from '../context/ThemeToggle'; // 👈 import the toggle

const Layout = () => {
  return (
    <>
      <header className="hero">
        <h1>Welcome to Cannon's Layer</h1>
        <p>Exploring creativity through code, games, and innovative projects!</p>
        {/* Go to Projects and land just below the hero */}
        <Link to="/projects#projectsTop" className="btn">View My Work</Link>
      </header>

      <nav>
        <button className="menu-button">☰</button>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Me</Link></li>
          <li><Link to="/projects">My Projects</Link></li>
          <li><Link to="/games">My Games</Link></li>
        </ul>

        {/* 👇 Add the theme toggle here */}
        <ThemeToggle />
      </nav>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>&copy; Cannon's Website | <a href="mailto:cannon.d18@gmail.com">Contact Me</a></p>
        <div className="social-links">
          <a href="https://github.com/cannondawg34" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/cannon-dyer-b1778a302" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </footer>
    </>
  );
};

export default Layout;
