import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get in Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p>I'm always interested in hearing about new projects and opportunities.</p>
            <div className="social-links">
              <a href="https://github.com/eliottvalette" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://linkedin.com/in/eliottvalette" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 