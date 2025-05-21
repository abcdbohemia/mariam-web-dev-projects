import React from 'react';
import './App.css';

function App() {
  return (
    <div className="portfolio-container">
      {/* Box 1: Hero Introduction*/}
      <header className="bento-box hero-intro">
        <img src="/images/image0.jpeg" alt="Mariam Chkadua" className="profile-photo" /> {/* Placeholder */}
        <h1>Mariam Chkadua, Front-End Developer</h1>
        <p>Crafting engaging and responsive web experiences with React and modern CSS.</p>
        <a href="/your-resume.pdf" download className="btn">Download Resume</a> {/*Placeholder*/}
      </header>

      {/* Box 2: Skills & Technologies */}
      <section className="bento-box skills-section">
        <h2>Skills & Technologies</h2>
        <div className="skills-grid">
          <span>JavaScript (ES6+)</span>
          <span>React (with Hooks)</span>
          <span>HTML5</span>
          <span>CSS (Flexbox, Grid, Responsive Design)</span>
          <span>Git & GitHub</span>
          <span>RESTful APIs</span>    {/* ???? */}
        </div>
      </section>

      {/* Box 3: About Me /Quick Bio */}
      <section className="bento-box-about-me">
        <h2>About Me</h2>
        <p>My journey into web development becan with Codecasemy, sparking a passion for intuitive user interfaces.</p>
        <p>Based in Telavi, Georgia, open to remote opportunities.</p>
      </section>

      {/* Box 4: Featured Projects: Movie Explorer */}
      <section className="bento-box project-card movie-explorer">
        <img src="images/movie-explorer.png" alt="Movie Explorer" className="project-screenshot" /> {/*Placeholder */}
        <h3>Movie Explorer</h3>
        <p>Discover movies and explore details using the TMFB API.</p>
        <p ClassName="project-tech">Tech: React, REST API, Styled Components</p>
        <div className="project-links">
        <a href="https://your-movie-explorer-demo.netlify.app" target="_blank" rel="nooper noreferrer" className="btn">Live Demo</a>
        <a href="https://github.com/abcdbohemia/mariam-web-dev-projects/tree/main/movie-explorer" target="_blank" rel="noopener noreferrer" className="btn">GitHub Repo</a>
        </div>
      </section>

      {/* Box 5: Featured Project: Weather App */}
      <section className="bento-box project-card weather-app">
        <img src="images/weather-app.png" alt="Weather App" className="project-screenshot" /> {/*Placeholder */}
        <h3>Real-Time Weather App</h3>
        <p>Get current weather conditions for any city worldwide.</p>
        <p className="project-tech">Tech: React, OpenWeather API</p>
        <div className="project-links">
          <a href="https://your-weather-app-demo.netlify.app" target="_blank" rel="noopener noreferrer" className="btn">Live Demo</a>
          <a href="https://github.com/abcdbohemia/mariam-web-dev-projects/tree/main/weather-app" target="_blank" rel="noopener noreferrer" className="btn">GitHub Repo</a>
        </div>
      </section>

      {/* Box 6: Featured Project: Poledex*/}
      <section className="bento-box project-card pokedex">
        <img src="images/dynamic-pokedex.png" alt="Pokedex" className="project-screenshot" /> {/*Placeholder*/}
        <h3>Interactive Pokedex</h3>
        <p>Explore Pokemon data with search and filter functionality.</p>
        <p className="project-tech">Tech: React, PokeAPI</p>
        <div className="project-links">
          <a href="http://your-pokedex-demo.netlify.app" target="_blank" rel="noopener noreferrer" className="btn">GitHub Repo</a>
        </div>
      </section>

      {/* Box 7: Contact & Social Links */}
      <footer className="bento-box contact-info">
        <h2>Let's Connect!</h2>
        <p><a href="mariamchkadua@gmail.com">mariamchkadua@gmail.com</a></p>
        <div className="social-links">
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/abcdbohemia?tab=repositories" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
