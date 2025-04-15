import React from 'react';
import todoImage from '../assets/todo.png';
import todoVideo from '../assets/todo.mp4';
import paletteImage from '../assets/palette.png';
import paletteVideo from '../assets/palette.mp4';
import quizImage from '../assets/quiz.png';
import quizVideo from '../assets/quiz.mp4';

import './Projects.css';

function Projects() {
    return (
        <div className="projects-container">
            <h2>Featured Projects</h2>
            <div className="projects-highlight">
                <h3>To-Do List</h3>
                <video width="720" height="640" controls poster={todoImage}>
                    <source src={todoVideo} type="video/mp4" />
                    Your broweser does not support the video tag.
                </video>
                <p>This video showcases our simple and effective application for managing your daily tasks.</p>
                <a href="https://github.com/abcdbohemia/mariam-web-dev-projects.git" rel="noopener noreferrer">View Code</a>
            </div>
            <div className="projects-highlight">
                <h3>Color Palette Generator</h3>
                <video width="720" height="640" controls poster={paletteImage}>
                    <source src={paletteVideo} type="video/mp4" />
                    Your broweser does not support the video tag.
                </video>
                <p>See our color palette generator in action!</p>
                <a href="https://github.com/abcdbohemia/mariam-web-dev-projects.git" rel="noopener noreferrer">View Code</a>
            </div>
            <div className="projects-highlight">
                <h3>Quiz App</h3>
                <video width="720" height="640" controls poster={quizImage}>
                    <source src={quizVideo} type="video/mp4" />
                    Your broweser does not support the video tag.
                </video>
                <p>This video offers a brief demonstration of our interactive quiz application in action.</p>
                <a href="https://github.com/abcdbohemia/mariam-web-dev-projects.git" rel="noopener noreferrer">View Code</a>
            </div>
        </div>
    );
}
export default Projects;