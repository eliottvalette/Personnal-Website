import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">Eliott Valette</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
      <div className="hero">
        <h1>Hi, I'm Eliott Valette</h1>
        <p>Deep Learning Student & Full Stack Developer</p>
        <div className="hero-cta">
          <a href="#projects" className="btn primary">View My Work</a>
          <a href="#contact" className="btn secondary">Get in Touch</a>
        </div>
      </div>
    </header>
  );
};

export default Header; 