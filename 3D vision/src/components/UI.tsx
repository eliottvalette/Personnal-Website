import { useState } from 'react';
import { Html } from '@react-three/drei';
import '../styles/UI.css';

interface ProjectCard {
  id: number;
  title: string;
  description: string;
  techTags: string[];
  githubLink: string;
}

interface ApplicationCard {
  id: number;
  title: string;
  description: string;
}

const skillsList = [
  'C', 'PyGame', 'Supabase', 'MySQL', 'Pandas', 'PyTorch'
];

const projects: ProjectCard[] = [
  {
    id: 1,
    title: 'ISIC-2024-Hackathon',
    description: 'Participation au défi ISIC-2024 pour classer les lésions cutanées avec des techniques avancées de ML.',
    techTags: ['Deep Learning', 'Computer Vision', 'Healthcare'],
    githubLink: 'https://github.com/eliottvalette/ISIC-2024-Hackathon'
  },
  {
    id: 2,
    title: 'MONAI',
    description: 'Contribution à un toolkit d\'IA pour l\'imagerie médicale, adapté à la recherche en santé.',
    techTags: ['Medical Imaging', 'AI', 'Healthcare'],
    githubLink: 'https://github.com/eliottvalette/MONAI'
  },
  {
    id: 3,
    title: 'DeepFlush',
    description: 'Une innovation en ML appliquée à la santé.',
    techTags: ['Machine Learning', 'Healthcare'],
    githubLink: 'https://github.com/eliottvalette/DeepFlush'
  },
  {
    id: 4,
    title: 'Customer-Transaction-Prediction',
    description: 'Pipeline LightGBM pour la classification binaire, explorant les données de santé financière.',
    techTags: ['LightGBM', 'Machine Learning', 'Finance'],
    githubLink: 'https://github.com/eliottvalette/Customer-Transaction-Prediction'
  },
];

const applications: ApplicationCard[] = [
  {
    id: 1,
    title: 'Outils de diagnostic',
    description: 'Outils de diagnostic basés sur l\'analyse d\'images médicales.'
  },
  {
    id: 2,
    title: 'Plateforme d\'analyse prédictive',
    description: 'Plateforme d\'analyse prédictive pour les données de santé.'
  }
];

// Left container with navigation
const LeftPanel = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'startup', label: 'Half-Life' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <Html position={[-2.6, 1, -1.5]} transform occlude distanceFactor={1.5}>
      <div className="container-panel left-panel">
        <div className="panel-content">
          <nav className="sidebar">
            <ul>
              {sections.map(section => (
                <li 
                  key={section.id}
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.label}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </Html>
  );
};

// Home Panel
const HomePanel = () => {
  return (
    <div className="panel-section">
      <div className="profile-card">
        <div className="profile-image">
          <div className="avatar"></div>
        </div>
        <div className="profile-info">
          <h1>Eliott Valette</h1>
          <h2>Étudiant HEC Paris/ENSAE | Spécialiste en Deep Learning</h2>
          <p>Faites défiler pour explorer mon parcours en machine learning et santé.</p>
        </div>
      </div>
    </div>
  );
};

// About Panel
const AboutPanel = () => {
  return (
    <div className="panel-section">
      <h2>About Me</h2>
      <div className="about-content">
        <div className="about-text">
          <p>I am a student at HEC Paris/ENSAE specializing in Deep Learning. My passion lies in developing innovative solutions using cutting-edge technologies and machine learning algorithms.</p>
          <p>With a strong foundation in both theoretical and practical aspects of computer science, I focus on creating efficient and scalable applications that solve real-world problems.</p>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <div className="skills-grid">
            {skillsList.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Panel
const ProjectsPanel = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="panel-section">
      <h2>Recherche et santé : Hackathons et collaborations</h2>
      <p className="section-description">Mon intérêt pour la santé m'a conduit à participer à des hackathons et à collaborer avec des organismes de santé, en appliquant le machine learning à des problèmes concrets comme le diagnostic du cancer de la peau et l'imagerie médicale.</p>
      
      <div className="projects-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            style={{ 
              transform: `scale(${hoveredCard === project.id ? 1.05 : 1})`,
            }}
            onMouseEnter={() => setHoveredCard(project.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech">
              {project.techTags.map((tag, index) => (
                <span key={index} className="tech-tag">{tag}</span>
              ))}
            </div>
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">Lien GitHub</a>
          </div>
        ))}
      </div>
      
      <div className="collaboration-section">
        <h3>Collaboration</h3>
        <p>Début de prospection auprès d'organismes de santé pour appliquer ces solutions à grande échelle.</p>
      </div>
    </div>
  );
};

// Startup Panel
const StartupPanel = () => {
  return (
    <div className="panel-section">
      <h2>Half-Life : Fusionner santé et machine learning</h2>
      <div className="startup-content">
        <p className="startup-description">Fondateur de Half-Life, une startup visant à combiner santé et machine learning pour développer des applications innovantes. Actuellement en cours de développement : outils de diagnostic assisté par IA et solutions personnalisées pour les professionnels de la santé.</p>
        
        <div className="applications-section">
          <h3>Applications en cours</h3>
          <div className="applications-grid">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <h4>{app.title}</h4>
                <p>{app.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="vision-section">
          <h3>Vision</h3>
          <p>Transformer la santé grâce à l'intelligence artificielle, un pas à la fois.</p>
        </div>
      </div>
    </div>
  );
};

// Contact Panel
const ContactPanel = () => {
  return (
    <div className="panel-section">
      <h2>Get in Touch</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p>I'm always interested in hearing about new projects and opportunities.</p>
          <div className="social-links">
            <a href="https://github.com/eliottvalette" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/eliottvalette" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
        
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" required type="text" name="name" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" required type="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required></textarea>
          </div>
          <button type="submit" className="btn primary">Send Message</button>
        </form>
      </div>
    </div>
  );
};

// Center container with content panels
const CenterPanel = ({ activeSection }: { activeSection: string }) => {
  return (
    <Html position={[0, 1, -2.5]} transform occlude distanceFactor={1.5}>
      <div className="container-panel center-panel">
        <div className="panel-content">
          {activeSection === 'home' && <HomePanel />}
          {activeSection === 'about' && <AboutPanel />}
          {activeSection === 'projects' && <ProjectsPanel />}
          {activeSection === 'startup' && <StartupPanel />}
          {activeSection === 'contact' && <ContactPanel />}
        </div>
      </div>
    </Html>
  );
};

// Right container with notes
const RightPanel = () => {
  return (
    <Html position={[2.9, 1.5, -1]} transform occlude distanceFactor={1.5}>
      <div className="container-panel right-panel">
        <div className="panel-content">
          <div className="notes-panel">
            <h2>Notes</h2>
            <div className="note">
              <h3>Bienvenue sur mon portfolio</h3>
              <p>Découvrez mon parcours à l'intersection du machine learning et de la santé.</p>
              <p>Ce site présente mes projets de recherche et ma vision pour l'avenir de la santé numérique.</p>
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
};

const UI = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <LeftPanel activeSection={activeSection} setActiveSection={setActiveSection} />
      <CenterPanel activeSection={activeSection} />
      <RightPanel />
    </>
  );
};

export default UI; 