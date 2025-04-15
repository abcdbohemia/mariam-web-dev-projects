import React, { useState } from "react";
import './PortfolioWebsite.css'; 
import Projects from './Projects.js';

function PortfolioWebsite() {
    const [showProjectsContent, setShowProjectsContent] = useState(false);
    const handleViewProjectsClick = () => {setShowProjectsContent(true);
    };
    return (
        <div className="portfolio-website-container">
            <div className="portfolio-website-content">
                <h1>Mariam Chkadua</h1>
                < p className="portfolio-website-headline">Full-Stack Web Developer</p>
            <p className="portfolio-website-introduction"> Hi, I'm Mariam, a passionate and driven aspiring web developer. With a solid foundation of HTML, CSS, JacaScript, and
                React gained through Codeacademy and hands-on practice, I'm eager to contribute my skills to exciting projects. My initial projects, including a to-do list,
                color generator, and quiz application, demonstrate my ability to translate concepts into functional web applications. I'm currently seeking opportunities 
                to further develop my expertise and collaborate on innovative solutions. 
            </p>
            <div className="portfolio-website-links">{/* We'll add links to your GitHub, LinkedIn, etc.here */}
                <a href="https://github.com/abcdbohemia" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://linkedin.com/in/your-linkedin-username" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                {/* Add more links as needed */}
            </div>
            <button className="portfolio-website-button" onClick={handleViewProjectsClick}>View My Projects</button> {/*Call to action */}
            </div>
            {showProjectsContent && (
                <div className="projects-content">
                    {Projects()}
                </div>
                    )}
            {/* You might want to add a aprofile image here later */}
        </div>
    );
}

export default PortfolioWebsite;