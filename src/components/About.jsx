import React from 'react';

const About = () => {
  const skills = [
    'C', 'Firebase', 'MongoDB', 'MySQL', 'Pandas', 
    'PyTorch', 'scikit-learn', 'Seaborn', 'TensorFlow'
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