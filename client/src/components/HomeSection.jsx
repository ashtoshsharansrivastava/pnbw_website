import React from 'react';

export default function HomeSection({ properties, onSelect }) {
  return (
    <section id="home-section">
      <h2>Featured Properties</h2>
      <div className="property-grid">
        {properties.map(prop => (
          <div
            key={prop._id}
            className="property-card"
            onClick={() => onSelect(prop)}
          >
            <img src={`/images/${prop.images[0]}`} alt={prop.title} />
            <h3>{prop.title}</h3>
            <p>₹{prop.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
