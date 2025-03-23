import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'ISIC-2024-Hackathon',
      description: 'Participation au défi ISIC-2024 pour classer les lésions cutanées avec des techniques avancées de ML.',
      link: 'https://github.com/eliottvalette/ISIC-2024-Hackathon',
      tech: ['Deep Learning', 'Computer Vision', 'Healthcare']
    },
    {
      title: 'MONAI',
      description: 'Contribution à un toolkit d\'IA pour l\'imagerie médicale, adapté à la recherche en santé.',
      link: 'https://github.com/eliottvalette/MONAI',
      tech: ['Medical Imaging', 'AI', 'Healthcare']
    },
    {
      title: 'DeepFlush',
      description: 'Une innovation en ML appliquée à la santé.',
      link: 'https://github.com/eliottvalette/DeepFlush',
      tech: ['Machine Learning', 'Healthcare']
    },
    {
      title: 'Customer-Transaction-Prediction',
      description: 'Pipeline LightGBM pour la classification binaire, explorant les données de santé financière.',
      link: 'https://github.com/eliottvalette/Customer-Transaction-Prediction',
      tech: ['LightGBM', 'Machine Learning', 'Finance']
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Recherche et santé : Hackathons et collaborations</h2>
        <p className="section-description">
          Mon intérêt pour la santé m'a conduit à participer à des hackathons et à collaborer avec des organismes de santé, 
          en appliquant le machine learning à des problèmes concrets comme le diagnostic du cancer de la peau et l'imagerie médicale.
        </p>
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
                Lien GitHub
              </a>
            </div>
          ))}
        </div>
        <div className="collaboration-section">
          <h3>Collaboration</h3>
          <p>Début de prospection auprès d'organismes de santé pour appliquer ces solutions à grande échelle.</p>
        </div>
      </div>
    </section>
  );
};

export default Projects; 