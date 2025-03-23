import React from 'react';

const Startup = () => {
  const applications = [
    {
      title: 'Outils de diagnostic',
      description: 'Outils de diagnostic basés sur l\'analyse d\'images médicales.'
    },
    {
      title: 'Plateforme d\'analyse prédictive',
      description: 'Plateforme d\'analyse prédictive pour les données de santé.'
    }
  ];

  return (
    <section id="startup" className="startup">
      <div className="container">
        <h2>Half-Life : Fusionner santé et machine learning</h2>
        <div className="startup-content">
          <p className="startup-description">
            Fondateur de Half-Life, une startup visant à combiner santé et machine learning pour développer 
            des applications innovantes. Actuellement en cours de développement : outils de diagnostic 
            assisté par IA et solutions personnalisées pour les professionnels de la santé.
          </p>
          
          <div className="applications-section">
            <h3>Applications en cours</h3>
            <div className="applications-grid">
              {applications.map((app, index) => (
                <div key={index} className="application-card">
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
    </section>
  );
};

export default Startup; 