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

// Navigation Sidebar
const SidebarIcons = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) => {
  // Icons
  const sections = [
    { 
      id: 'home', 
      label: 'Home',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'about', 
      label: 'About',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'projects', 
      label: 'Projects',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'startup', 
      label: 'Half-Life',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 22V12M3 12V8.5C3 7.70435 3.31607 6.94129 3.87868 6.37868C4.44129 5.81607 5.20435 5.5 6 5.5C6.79565 5.5 7.55871 5.81607 8.12132 6.37868C8.68393 6.94129 9 7.70435 9 8.5V12M3 12H9M21 22V16M21 16V4.5C21 3.70435 20.6839 2.94129 20.1213 2.37868C19.5587 1.81607 18.7956 1.5 18 1.5C17.2044 1.5 16.4413 1.81607 15.8787 2.37868C15.3161 2.94129 15 3.70435 15 4.5V16M21 16H15M9 22V18.5C9 17.7044 9.31607 16.9413 9.87868 16.3787C10.4413 15.8161 11.2044 15.5 12 15.5C12.7956 15.5 13.5587 15.8161 14.1213 16.3787C14.6839 16.9413 15 17.7044 15 18.5V22M9 22H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'contact', 
      label: 'Contact',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="sidebaricons-container">
      <ul>
        {sections.map(section => (
          <li 
            key={section.id}
            className={activeSection === section.id ? 'active' : ''}
            onClick={() => setActiveSection(section.id)}
          >
            <div className="icon-wrapper">
              {section.icon}
            </div>
            <span className="icon-label">{section.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Navigation Sidebar
const SidebarNavigation = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (section: string) => void }) => {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'startup', label: 'Half-Life' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">Bibliothèque</h2>
      <p className="sidebar-subtitle">Portfolio</p>
      <div className="sidebar">
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
      </div>
    </div>
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
      
      <div className="home-highlights">
        <h3>Highlights</h3>
        <div className="highlight-grid">
          <div className="highlight-card">
            <h4>Machine Learning</h4>
            <p>Spécialiste en apprentissage profond avec une expertise dans les réseaux de neurones et l'intelligence artificielle appliquée à la santé.</p>
          </div>
          <div className="highlight-card">
            <h4>Healthcare Tech</h4>
            <p>Développement d'applications innovantes pour le secteur de la santé, notamment dans le domaine du diagnostic assisté par IA.</p>
          </div>
          <div className="highlight-card">
            <h4>Research</h4>
            <p>Participation à des hackathons et projets de recherche dans le domaine de l'imagerie médicale et l'analyse de données de santé.</p>
          </div>
          <div className="highlight-card">
            <h4>Entrepreneurship</h4>
            <p>Fondateur de Half-Life, une startup visant à transformer la santé grâce à l'intelligence artificielle et le machine learning.</p>
          </div>
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
          <p>Mon parcours académique m'a permis de développer une expertise unique à l'intersection de la data science, de l'économie et du management, que j'applique particulièrement au domaine de la santé.</p>
          <p>Je suis passionné par les technologies qui peuvent avoir un impact positif sur la société, notamment dans le domaine médical où l'intelligence artificielle peut révolutionner les méthodes de diagnostic et de traitement.</p>
        </div>
        <div className="skills">
          <h3>Skills</h3>
          <div className="skills-grid">
            {skillsList.map((skill, index) => (
              <div key={index} className="skill-item">{skill}</div>
            ))}
            <div className="skill-item">Deep Learning</div>
            <div className="skill-item">Python</div>
            <div className="skill-item">TensorFlow</div>
            <div className="skill-item">Computer Vision</div>
            <div className="skill-item">NLP</div>
            <div className="skill-item">Data Visualization</div>
            <div className="skill-item">React</div>
            <div className="skill-item">JavaScript</div>
            <div className="skill-item">TypeScript</div>
          </div>
          
          <div className="education">
            <h3>Education</h3>
            <div className="education-item">
              <h4>HEC Paris</h4>
              <p>Master in Management - Grande École</p>
              <p className="date">2022 - Present</p>
            </div>
            <div className="education-item">
              <h4>ENSAE Paris</h4>
              <p>Engineering Degree - Data Science & Machine Learning</p>
              <p className="date">2022 - Present</p>
            </div>
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

// Main Content Panel
const ContentPanel = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="content-container">
      <div className="content-header">
        <h2 className="content-title">Projets</h2>
        <p className="content-subtitle">Portfolio et expériences</p>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Rechercher dans la collection" />
        </div>
      </div>
      <div className="content-panel">
        {activeSection === 'home' && <HomePanel />}
        {activeSection === 'about' && <AboutPanel />}
        {activeSection === 'projects' && <ProjectsPanel />}
        {activeSection === 'startup' && <StartupPanel />}
        {activeSection === 'contact' && <ContactPanel />}
      </div>
      <div className="player-controls">
        <button className="control-button previous">◀◀</button>
        <button className="control-button play-pause">▶</button>
        <button className="control-button next">▶▶</button>
        <div className="now-playing">
          <span className="track-name">Portfolio</span>
          <span className="artist-name">Eliott Valette</span>
        </div>
      </div>
    </div>
  );
};

// Main UI component
const UI = () => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <>
      <Html position={[-4.8, 1, -2.3]} transform occlude distanceFactor={1.5}>
        <SidebarIcons activeSection={activeSection} setActiveSection={setActiveSection} />
      </Html>
      <Html position={[0, 1, -2.3]} transform occlude distanceFactor={1.5}>
        <div className="ui-container">
          <SidebarNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
          <ContentPanel activeSection={activeSection} />
        </div>
      </Html>
    </>
  );
};

export default UI; 