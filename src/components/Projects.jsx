import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'TheLab - AI Eloquence Coach',
      description: 'A web application for analyzing and generating speeches using AI. Built with ReactJS, Node.js, Mistral API, OpenAI API, and PDF.js.',
      link: 'https://github.com/eliottvalette/TheLab-your-personnalised-AI-Eloquence-Coach',
      tech: ['React', 'Node.js', 'AI', 'PDF.js']
    },
    {
      title: '3D Website',
      description: 'An interactive scroll-based 3D animation website for showcasing customizable deck setups with smooth transitions.',
      link: 'https://github.com/eliottvalette/3D-Website',
      tech: ['HTML', 'CSS', 'JavaScript', '3D']
    },
    {
      title: 'DeepFlush',
      description: 'A Python-based deep learning project.',
      link: 'https://github.com/eliottvalette/DeepFlush',
      tech: ['Python', 'Deep Learning']
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex} className="tech-tag">{tech}</span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 