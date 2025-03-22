import React from 'react';

const About = () => {
  const skills = [
    'C', 'PyGame', 'Supabase', 'MySQL', 'Pandas', 
    'PyTorch'
  ];

  const rlProjects = [
    {
      title: 'Car-RL',
      description: 'Un projet RL explorant l\'apprentissage autonome dans des environnements simulés.',
      link: 'https://github.com/eliottvalette/Car-RL'
    },
    {
      title: 'Fighting-Tanks-Reinforcement-Learning',
      description: 'Un jeu multi-agent où des tanks intelligents apprennent à se battre sur un champ de bataille dynamique.',
      link: 'https://github.com/eliottvalette/Fighting-Tanks-Reinforcement-Learning'
    },
    {
      title: 'Snake-Game-Reinforcement-Learning',
      description: 'Un snake entraîné avec RL pour naviguer et grandir dans le jeu classique.',
      link: 'https://github.com/eliottvalette/Snake-Game-Reinforcement-Learning'
    }
  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a student at HEC Paris/ENSAE specializing in Deep Learning. 
              My passion lies in developing innovative solutions using cutting-edge 
              technologies and machine learning algorithms.
            </p>
            <p>
              With a strong foundation in both theoretical and practical aspects of 
              computer science, I focus on creating efficient and scalable applications 
              that solve real-world problems.
            </p>
          </div>
          <div className="skills">
            <h3>Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 